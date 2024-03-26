// Een interface om het studie object te beschrijven
export interface IStudy {
    cohort: string;
    creboCode: string;
    creboNaam: string;
    klas: string;
    leerweg: string;
    locatie: string;
    opleiding: string;
    studieprogrammacode: string;
    firstName: string;
    lastName: string;
    userName: string;
    refOLWA: string[];
  }
  interface IProfileProps {
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
  export interface IStudys{
    studies: IStudy[];
  }
  
  // Een service class om de studies array te maken
  export class StudyService {
    // Een functie om een string te splitsen op komma's en eventuele spaties te verwijderen
    private splitString(str: string): string[] {
       // Controleer of de string een komma bevat
    if (str.indexOf("|") !== -1 ) {
      // Zo ja, splits de string op komma's en verwijder eventuele spaties
      return str.split("|");
    } else {
      // Zo nee, geef dezelfde waarde twee keer terug in een array
      return [str, str];
    }
      //return str.split(",");
    }
    private splitRefOLW(str: string): string[] {
      // Controleer of de string een komma bevat
      if (str.indexOf("|") !== -1 ) {
        // Zo ja, splits de string op komma's en verwijder eventuele spaties
        return str.split("|").map(s => s.trim());
      } else {
        // Zo nee, geef lege array terug
        return [];
      }
   }
    // Een functie om een array van objecten te maken die elk een studie bevatten
    public createStudiesArray(userProfileProperties: IProfileProps | undefined): IStudy[] {
      // Haal de waarden op uit de userProfileProperties
      if (userProfileProperties === undefined) {
        // Handle the null case appropriately.
        return [];
      }
      const cohort = this.splitString(userProfileProperties.ACCohort);
      const creboCodes = this.splitString(userProfileProperties.ACCreboCode);
      const creboNames = this.splitString(userProfileProperties.ACCreboNaam);
      const classes = this.splitString(userProfileProperties.ACKlas);
      const leerweg = this.splitString(userProfileProperties.ACLeerweg);
      const locatie = this.splitString(userProfileProperties.ACLocatie);
      const opleiding = this.splitString(userProfileProperties.ACOpleiding);
      const studieprogrammacode = this.splitString(userProfileProperties.ACStudieprogrammacode);
      const firstName = userProfileProperties.FirstName;
      const lastName = userProfileProperties.LastName;
      const userName = userProfileProperties.UserName;
      const refOLWA = this.splitRefOLW(userProfileProperties.ACRefOLWS);
  
      // Maak een lege array om de studies in op te slaan
      const studies: IStudy[] = [];
  
      // Loop door de creboCodes array en maak voor elke code een studie object
      for (let i = 0; i < userProfileProperties.ACStudieprogrammacode.split("|").length; i++) {
        // Maak een studie object met de bijbehorende waarden
        const study: IStudy = {
          cohort: cohort[i],
          creboCode: creboCodes[i],
          creboNaam: creboNames[i],
          klas: classes[i],
          leerweg: leerweg[i],
          locatie: locatie[i],
          opleiding: opleiding[i],
          studieprogrammacode: studieprogrammacode[i],
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          refOLWA: refOLWA
        };
  
        // Voeg het studie object toe aan de studies array
        studies.push(study);
      }
  
      // Geef de studies array terug
      return studies;
    }
  }
  