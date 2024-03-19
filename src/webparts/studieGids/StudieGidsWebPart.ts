import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { FluentProvider, FluentProviderProps, webLightTheme} from '@fluentui/react-components';
import { getUserProfileProperties, IProfileProps } from './components/ProfileService';
//import * as strings from 'StudieGidsWebPartStrings';
import StudieGids from './components/StudieGids';
import { IStudieGidsProps } from './components/IStudieGidsProps';
// Importeer de StudyService en de IStudy interface
import { StudyService, IStudy } from './components/StudyService';

export interface IStudieGidsWebPartProps {
  email: string;
}


export default class StudieGidsWebPart extends BaseClientSideWebPart<IStudieGidsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _userProfileProperties: IProfileProps | undefined = undefined;
  private studies: IStudy[];
  private studyService: StudyService = new StudyService();
  private userDisplayName: string = ''; 
  public render(): void {
    const element: React.ReactElement<IStudieGidsProps> = React.createElement(
      StudieGids,
      {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.userDisplayName,
        studies: this.studies
      }
    );
    const fluentElement: React.ReactElement<FluentProviderProps> = React.createElement(
      FluentProvider,
      {
        theme: webLightTheme
      },
      element
    );

    ReactDom.render(fluentElement, this.domElement);
    //ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    let loginName: string = this.context.pageContext.user.email;
    if(this.properties.email){ // Check if the email property is not empty
      // Validate the email address using a regular expression
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(emailRegex.test(this.properties.email)){
        loginName = this.properties.email;
      }
    }
    console.log("Looking for user with loginname:"+loginName);
    // Haal de user profile properties op
    this._userProfileProperties = await getUserProfileProperties(this.context, loginName);
    // Log de user profile properties in de console
    console.log("User Profile Properties:", this._userProfileProperties);
    // Maak een studies array met de StudyService
    const studies = this.studyService.createStudiesArray(this._userProfileProperties);
    this.userDisplayName = this._userProfileProperties?.FirstName || '';
    this.studies=studies;
    // Log de studies array in de console
    console.log("Studies:", this.studies); 
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  private validateEmail(value: string): string {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailRegex.test(value)){
      // If the email address is valid, re-render the web part
      this.render();
      return '';
    }else{
      // If the email address is invalid, return an error message
      return 'Please enter a valid email address';
    }
  }
  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: string, newValue: string): Promise<void> {
    // Check if the changed property is the email address
    if (propertyPath === 'email') {
      // Call the onInit method to get the profile properties based on the new email address
       await this.onInit();
      // this.render();
      // Re-render the web part
      //this.render();

      //location.reload();
    }
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Voor test en demonstratie doeleinden kan hier het e-mailadres van een student worden ingevuld. De webpart werkt vervolgens in de context van deze gebruiker."//strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Algemene instellingen",
              groupFields: [
                PropertyPaneTextField('email', {
                  label: "Email address",
                  onGetErrorMessage: this.validateEmail.bind(this)
                })
              ],
            },
          ]
        }
      ]
    };
  }
}
