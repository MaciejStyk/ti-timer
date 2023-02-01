import { FunctionComponent } from "react";
import { IPhaseProps } from "../../types";
import TopPanel from "../../panels/TopPanel";
import AgendaPanel from "./AgendaPanel";
import styles from "./index.module.css";

const AgendaNotVoted: FunctionComponent<IPhaseProps> = (props) => {
  return (
    <div className={styles.background}>
      <TopPanel />
      <AgendaPanel {...props} />
    </div>
  );
};

export default AgendaNotVoted;
