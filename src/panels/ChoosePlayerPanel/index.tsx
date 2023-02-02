import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IPhaseProps } from "../../types";
import triggers from "../../global/triggers";
import Title from "./Title";
import ChoosePlayer from "./Players";
import Buttons from "./Buttons";
import cn from "classnames";
import styles from "./index.module.css";

const ChoosePlayerPanel: FunctionComponent<IPhaseProps> = (props) => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const { trigger } = choosePlayerAction;

  const choosePlayerPanelClasses = cn({
    [styles.choosePlayerPanel]: true,
    [styles.strategyPhase]: trigger === triggers.naaluTokenChange,
    [styles.actionPhase]: trigger === triggers.politics,
    [styles.agendaPhase]:
      trigger === triggers.politicsRider ||
      trigger === triggers.publicExecution,
  });

  return (
    <div className={choosePlayerPanelClasses}>
      <Title />
      <ChoosePlayer />
      <Buttons {...props} />
    </div>
  );
};

export default ChoosePlayerPanel;
