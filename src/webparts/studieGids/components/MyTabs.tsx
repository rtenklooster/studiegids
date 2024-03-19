// Importeer de React en Fluent UI React componenten die je nodig hebt
import * as React from "react";
import { Tab, TabList } from "@fluentui/react-components";
import { IStudy } from "./StudyService";

// Define an interface for the TabList props
interface ITabProps {
    // Add a prop for the studies array
    studies: IStudy[];
    setTab: React.Dispatch<React.SetStateAction<string | unknown>>;
  }
// Maak een TabList component die een array van studies als prop accepteert
export const MyTabs: React.FunctionComponent<ITabProps> = ({
    studies,
    setTab
}) => {
  // Een functie om een tablist te maken met de studies array
  const handleTabSelect = (e: React.MouseEvent<HTMLButtonElement>, data: {value: number}): void => {
    setTab(data.value);
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    queryParams.set("studyIndex", data.value.toString());
    url.search = queryParams.toString();
    window.history.replaceState({}, "", url.toString());
    // const url = new URL(window.location.href);
    // const queryParams = new URLSearchParams(url.search);
    // queryParams.set("studyIndex", data.value.toString());
    // url.search = queryParams.toString();
    // window.location.href = url.toString(); // verandert de URL en ververst de pagina
  };

  const createTabItems = (studies: IStudy[]): JSX.Element[] => {
    // Maak een lege array om de tabs in op te slaan
    const tabs = [];
    
    // Loop door de studies array en maak voor elke studie een tab
    for (let i = 0; i < studies.length; i++) {
      // Haal de studie op uit de array
      //const study = studies[i];
        // Maak een tab met de opleiding als titel // was: <Tab value={i}>{study.opleiding}</Tab>
        const tab = (
            <Tab value={i}>Opleiding {i+1}</Tab>
        );
        tabs.push(tab);
      }
      // Geef de tabs array terug
      return tabs;
    };
    // Roep de createTabItems functie aan en geef het resultaat terug
    return <TabList
                onTabSelect={handleTabSelect}
                defaultSelectedValue={0}
            >{createTabItems(studies)}</TabList>
}