import * as React from 'react';
import styles from './StudieGids.module.scss';
import { IStudieGidsProps } from './IStudieGidsProps';
//import { IStudy } from "./StudyService";
import { Title3 } from '@fluentui/react-components';
import { MyTabs } from "./MyTabs"; // Importeer de MyTabs component
import { MyCards } from "./MyCards";
//import { MyTabs } from './MyTabs';
const StudieGids: React.FC<IStudieGidsProps> = (props) => {
  const { userDisplayName, studies } = props;
  const [tab, setTab] = React.useState<string | unknown>("0");
  console.log(tab);
    return (
      <section>
      <div>
        <Title3>Hallo {userDisplayName},</Title3><br/>
        <div>Jij volgt deze opleiding(en): </div>
        <div className={styles.stack}>
        {studies && <MyTabs studies={studies} setTab={setTab} />}
          <MyCards studies={studies}/>
        </div>
      </div>
    </section>
    );
  }
  export default StudieGids;
