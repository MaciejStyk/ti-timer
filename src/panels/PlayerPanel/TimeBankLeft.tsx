import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ITime } from "../../types";
import RenderTime from "../../components/RenderTime";
import styles from "./index.module.css";

const TimeBankLeft: FunctionComponent<{ time: ITime }> = ({ time }) => {
  const { agendaPhase } = useSelector((state: RootState) => state);

  return (
    <div className={styles.timeBankLeft}>
      <span>
        {agendaPhase.isBeingVoted ? "Voting" : "Turn"}{" "}
        {time.delayed.value === 0 ? "time" : "starts in"}
      </span>

      <div className={styles.timer}>
        <RenderTime
          time={
            time.delayed.value === 0 ? time.elapsed.value : time.delayed.value
          }
        />
      </div>
    </div>
  );
};

export default TimeBankLeft;
