import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { unlockAgendaPhase } from "../../../redux/reducers/agendaPhase";
import mecatolWithoutCustodian from "../../../assets/other/mecatol-rex-no-custodian.png";
import cn from "classnames";
import styles from "./index.module.css";

const MecatolRight: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState<boolean>(false);

  const buttonClasses = cn({
    [styles.button]: true,
    [styles.hovered]: hover,
  });

  return (
    <div
      className={styles.imageContainer}
      onClick={() => dispatch(unlockAgendaPhase())}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={mecatolWithoutCustodian}
        alt="Mecatol Rex without Custodian Token"
      />
      <button className={buttonClasses}>
        {hover
          ? "Proceed to the agenda phase"
          : "Custodian Token removed from Mecatol"}
      </button>
    </div>
  );
};

export default MecatolRight;
