// Importeer de React en Fluent UI React componenten die je nodig hebt
import * as React from "react";
import { Card, CardHeader, CardFooter, Button, CardPreview, Body1, Caption1} from "@fluentui/react-components";
import { IStudy } from "./StudyService";
import styles from './StudieGids.module.scss';
// Define an interface for the TabList props
interface ITabListProps {
    // Add a prop for the studies array
    studies: IStudy[];
  }

// Maak een TabList component die een array van studies als prop accepteert
export const MyCards: React.FunctionComponent<ITabListProps> = ({
    studies,
}) => {
  // Een functie om een tablist te maken met de studies array

  const createCards = (studies: IStudy[]): JSX.Element[] => {
    const cards: JSX.Element[] = [];
    // Use a default parameter value of 0 if the string is empty or undefined
    const stringToInt = (str: string ="0" ): number => {
        console.log('stringToInt string: '+str);
        // Cast the string to an int using +
        const num = +str;
        // Check for NaN and return 0 if true
        if (isNaN(num)) {
        return 0;
        }
        // Return the int value
        console.log('stringToInt return: '+num);
        return num;
    };
    console.log('MyCards studies: ');
    // Get the current query parameters
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);

    // Get the studieIndex query parameter
    const selectedIndex = stringToInt(queryParams.get('studyIndex') || undefined);
    for (let i = 0; i < studies.length; i++) {
      // Haal de studie op uit de array
      const study = studies[i];
        // Maak een tab met de opleiding als titel
        // let tab = (
        //     <Tab value={i}>{study.opleiding}</Tab>
        // );

        // Controleer of de index overeenkomt met de geselecteerde index
   if (i === selectedIndex) {
      // Maak een card header met de opleiding
      const cardHeader = (
        <CardHeader
                header={
                  <Body1>
                    <b>{study.opleiding}</b>
                  </Body1>
                }
                description={<Caption1>Hieronder vind je de informatie over jouw studie.</Caption1>}
              />
      );
      console.log(cardHeader); // Header zonder is mooier vind ik
      // Maak een card body met de andere informatie
      //    <div><b>Crebo naam:</b> {study.creboNaam}</div>
      //    <div><b>Klas:</b> {study.klas}</div>
      //    <div><b>Leerweg:</b> {study.leerweg}</div>
      //
      //                    <div><b>Opleiding:</b>{study.opleiding}</div>
      //    <div><b>Cohort:</b>{study.cohort}</div>
      //    <div><b>Crebo code:</b> {study.creboCode}</div>
      //    <div><b>Crebo naam:</b> {study.creboNaam}</div>
      //    <div><b>Klas:</b> {study.klas}</div>
      //    <div><b>Leerweg:</b> {study.leerweg}</div>
      //    <div><b>Locatie:</b> {study.locatie}</div>
      //    <div><b>Studieprogrammacode:</b> {study.studieprogrammacode}</div>
      const cardBody = (
        <CardPreview  className={styles.cardPreview}>
          <div><b>Opleiding: </b>{study.opleiding}</div>
          <div><b>Cohort: </b>{study.cohort}</div>
          <div><b>Klas: </b> {study.klas}</div>
          <div><b>Locatie: </b> {study.locatie}</div>
          <div><b>Studieprogrammacode: </b> {study.studieprogrammacode}</div>
        </CardPreview>
      );
      let cardFooter = null; // Initialize to null
      const firstYear = parseInt(study.cohort.split('/')[0], 10); // Extract the first part and convert to integer
      if (firstYear > 2022) {
        // We hebben twee smaakjes. Opleidingen mét en opleidingen zonder uitstroomprofielen.
        cardFooter = (
          <CardFooter>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {study.refOLWA.length === 0 ? (
              <Button
                appearance="primary"
                onClick={() => window.open(`https://publicaties.alfa-college.formuleer.eu/opleidingswijzer/${study.studieprogrammacode}/${study.cohort.replace('/','-')}`, "_blank")}
              >
                Klik hier om jouw Opleidingswijzer te bekijken
              </Button>
            ) : (
              study.refOLWA.map(item => {
                const [code, description] = item.split('=');
                return (
                  <Button
                    key={code} // Zorg voor een unieke key voor elk item
                    appearance="primary"
                    onClick={() => window.open(`https://publicaties.alfa-college.formuleer.eu/opleidingswijzer/${code}/${study.cohort.replace('/','-')}`, "_blank")}
                  >
                    {description}
                  </Button>
                );
              })
            )}
            </div>
          </CardFooter>
        );
      }else{
        cardFooter = (
          <CardFooter>
            <Button 
              appearance="primary" 
              onClick={() => window.open(`https://alfacollege.sharepoint.com/sites/opleidingenplein/Paginas/Mijnopleiding.aspx`, "_blank")}
            >
              Klik hier om jouw Opleidingswijzer te bekijken
            </Button>
          </CardFooter>
        );
      }
      // Maak een card met de card header en body
      const cardContent = (
        <Card key={i}>
          {cardBody}
          {cardFooter}
        </Card>
      );

  const url = new URL(window.location.href);
  const queryParams = new URLSearchParams(url.search);

    // Append the study to the query string crebocode=25604&cohort=2021-2022&leerweg=BOL&locatie=ATOO

      const studyInfo = {
        crebocode: study.creboCode,
        cohort: study.cohort,
        leerweg: study.leerweg,
        locatie: study.locatie
      };
    
      Object.entries(studyInfo).forEach(([key, value]) => {
        queryParams.set(key, value.toString());
      });
    
      url.search = queryParams.toString();
      window.history.replaceState({}, '', url.toString());

      cards.push(cardContent);
    }
    }
    // Geef de tabs array terug
    return cards;
  };

  // Render de tablist met de studies array
  return <div>{createCards(studies)}</div>;
  // Define a function that takes a string parameter and returns an int

};
