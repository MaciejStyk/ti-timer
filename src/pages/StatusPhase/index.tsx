import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import TopPanel from "../../components/TopPanel";
import RenderTime from "../../components/RenderTime";
import themes from "../../global/themes";
import cn from "classnames";
import styles from "./index.module.css";

interface IStatusPhase {
  endPhase: () => void;
}

const StatusPhase: FunctionComponent<IStatusPhase> = (props) => {
  const { endPhase } = props;
  const { players } = useSelector((state: RootState) => state);

  const stepsArray = [
    "Score objectives",
    "Reveal public objective",
    "Draw action cards",
    "Remove command tokens",
    "Gain and redistribute command tokens",
    "Ready cards",
    "Repair units",
    "Return strategy cards",
  ];

  // ======== CLASSES ==========================================================

  const leftBarContentClasses = cn({
    [styles.barContent]: true,
    [styles.left]: true,
  });

  const rightBarContentClasses = cn({
    [styles.barContent]: true,
    [styles.right]: true,
  });

  const stepBarClasses = cn({
    [styles.bar]: true,
    [styles.stepBar]: true,
  });

  // ======== RENDER PAGE ======================================================

  return (
    <div className={styles.background}>
      <TopPanel />

      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.list}>
            <h2 className={styles.title}>Initiative order:</h2>
            {players.map((player, index) => (
              <div
                key={player.id}
                style={player.theme}
                className={cn({
                  [styles.bar]: true,
                  [styles.blackPlayerBar]:
                    player.theme.backgroundColor === themes[6].backgroundColor,
                })}
              >
                <div className={leftBarContentClasses}>{`${index + 1}. ${
                  player.name
                }`}</div>
                <div className={rightBarContentClasses}>
                  <RenderTime
                    time={player.timeBank.min * 60 + player.timeBank.sec}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.list}>
            <h2 className={styles.title}>Steps:</h2>
            {stepsArray.map((step, index) => (
              <div
                key={index}
                className={stepBarClasses}
                style={{ background: "" }}
              >
                <div className={styles.barContent}>{`${
                  index + 1
                }. ${step}`}</div>
              </div>
            ))}
          </div>
        </div>

        <button className={styles.endPhaseButton} onClick={endPhase}>
          Next phase
        </button>
      </div>
    </div>
  );
};

export default StatusPhase;
