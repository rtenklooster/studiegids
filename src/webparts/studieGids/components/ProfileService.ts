import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/profiles";
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Dit is een interface om de structuur en het type van een object te definiëren 
export interface IProfileProps {
    FirstName: string;
    LastName: string;
    UserName: string;
    ACCreboCode: string;
    ACCreboNaam: string;
    ACOpleiding: string;
    ACStudieprogrammacode: string;
    ACStudieprogramma: string;
    ACKlas: string;
    ACLeerweg: string;
    ACCohort: string;
    ACLocatie: string;
    ACRefOLWS: string;
}

export async function getUserProfileProperties(context: WebPartContext, loginName: string): Promise<IProfileProps | undefined > {
    loginName = "i:0#.f|membership|" + loginName;
    //let profile;
    try {
        // Probeer de spfi() functie te initialiseren
        const sp = spfi().using(SPFx(context));
        // Probeer de profiel eigenschappen op te halen
        const profile = await sp.profiles.getPropertiesFor(loginName);
        if (!profile.UserProfileProperties || profile.UserProfileProperties.length === 0) {
            // Als het profiel niet succesvol is opgehaald kunnen we wel stoppen.
            console.log("Er is geen profiel info gevonden voor de gebruiker met email address: " + loginName);
            return undefined;
        } else {
            // Wel gevonden, dus doorgaan.
            // Maak een variabele van het type ProfileProps en initialiseer deze met een leeg object
            const props: IProfileProps = {
                FirstName: '',
                LastName: '',
                UserName: '',
                ACCreboCode: '',
                ACCreboNaam: '',
                ACOpleiding: '',
                ACStudieprogrammacode: '',
                ACStudieprogramma: '',
                ACKlas: '',
                ACLeerweg: '',
                ACCohort: '',
                ACLocatie: '',
                ACRefOLWS: ''
            };
            // // Gebruik een for-loop om door de UserProfileProperties array te gaan en wijs de waarden toe aan de overeenkomstige velden in de ProfileProps variabele
            for (const prop of profile.UserProfileProperties) {
                //console.dir(prop);
                switch (prop.Key) {
                    case "FirstName":
                        props.FirstName = prop.Value;
                        break;
                    case "LastName":
                        props.LastName = prop.Value;
                        break;
                    case "UserName":
                        props.UserName = prop.Value;
                        break;
                    case "AC-CreboCode":
                        props.ACCreboCode = prop.Value.replace(/_/g, ' ');
                        break;
                    case "AC-CreboNaam":
                        props.ACCreboNaam = prop.Value.replace(/_/g, ' ');
                        break;
                    case "AC-Opleiding":
                        props.ACOpleiding = prop.Value.replace(/_/g, ' ');
                        break;
                    case "AC-Studieprogrammacode":
                        props.ACStudieprogrammacode = prop.Value.replace(/_/g, ' ');
                        break;
                    case "AC-Studieprogramma":
                        props.ACStudieprogramma = prop.Value.replace(/_/g, ' ');
                        break;
                    case "AC-Klas":
                        props.ACKlas = prop.Value;
                        break;
                    case "AC-Leerweg":
                        props.ACLeerweg = prop.Value;
                        break;
                    case "AC-Cohort":
                        props.ACCohort = prop.Value.replace('/','-');
                        break;
                    case "AC-Locatie":
                        props.ACLocatie = prop.Value;
                        break;
                    case "AC-RefOLW":
                        props.ACRefOLWS = prop.Value;
                        console.log("AC-RefOLW: " + prop.Value);
                        break;
                }
            }
            //console.log("Props object:", props);
            return props;
        }
    } catch (error) {
        // Vang eventuele fouten op en log ze naar de console
        console.error(error);
        return undefined;
    }

}
