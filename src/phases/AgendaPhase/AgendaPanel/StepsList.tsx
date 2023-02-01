import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import cn from "classnames";
import styles from "./index.module.css";

const StepsList: FunctionComponent = () => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  const stepsArray = agendaPhase.beforeVoting
    ? [
        agendaPhase.round === 1 &&
          'Apply effects "at the start" of the agenda phase',
        "Speaker reveals and reads the Agenda",
        'Apply effects "when" an agenda is revealed',
        'Apply effects "after" an agenda is revealed',
        "Open discussion",
      ]
    : [
        "Resolve Outcome",
        'Apply effects "when" an agenda is resolved',
        'Apply effects "after" an agenda is resolved',
        agendaPhase.round === 2 && "Ready planets",
      ];

  const stepBarClasses = cn({
    [styles.bar]: true,
    [styles.stepBar]: true,
  });

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>
        Steps {agendaPhase.beforeVoting ? "before" : "after"} voting:
      </h2>
      {stepsArray.filter(Boolean).map((step, index) => (
        <div key={index} className={stepBarClasses} style={{ background: "" }}>
          <div className={styles.barContent}>{`${index + 1}. ${step}`}</div>
        </div>
      ))}
    </div>
  );
};

export default StepsList;
