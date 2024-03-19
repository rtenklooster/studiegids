import { IStudy } from "./StudyService";
export interface IStudieGidsProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  studies: IStudy[];
}
