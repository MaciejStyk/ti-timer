import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IStrategyCard } from "../../global/strategyCards";
import views from "../../global/views";
import styles from "./index.module.css";

interface Props {
  hover: boolean;
  strategyCard: IStrategyCard;
}

const Tooltip: FunctionComponent<Props> = (props) => {
  const { hover, strategyCard } = props;
  const { current, strategyAction } = useSelector((state: RootState) => state);

  return (
    <>
      {current.view === views.actionPhase &&
        !strategyAction.isBeingPlayed &&
        hover &&
        !strategyCard.exhausted && (
          <div className={styles.tooltip}>
            Double press {strategyCard.id} or double click <br /> to play
            strategy action{" "}
          </div>
        )}
    </>
  );
};

export default Tooltip;
