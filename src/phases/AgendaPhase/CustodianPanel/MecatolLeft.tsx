import { FunctionComponent, useState } from "react";
import { IPhaseProps } from "../../../types";
import mecatolWithCustodian from "../../../assets/other/mecatol-rex-custodian.png";
import cn from "classnames";
import styles from "./index.module.css";

const MecatolLeft: FunctionComponent<IPhaseProps> = ({ handle }) => {
  const [hover, setHover] = useState<boolean>(false);

  const buttonClasses = cn({
    [styles.button]: true,
    [styles.hovered]: hover,
  });

  return (
    <div
      className={styles.imageContainer}
      onClick={handle.endPhase}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={mecatolWithCustodian} alt="Mecatol Rex with Custodian Token" />
      <button className={buttonClasses}>
        {hover
          ? "Proceed to the next round"
          : "Custodian Token still on Mecatol"}
      </button>
    </div>
  );
};

export default MecatolLeft;
