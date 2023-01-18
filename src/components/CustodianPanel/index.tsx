import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { unlockAgendaPhase } from "../../redux/agendaPhase";
import mecatolWithCustodian from "../../assets/other/mecatol-rex-custodian.png";
import mecatolWithoutCustodian from "../../assets/other/mecatol-rex-no-custodian.png";
import cn from "classnames";
import styles from "./index.module.css";

interface ICustodianPanel {
  endPhase: () => void;
}

const CustodianPanel: FunctionComponent<ICustodianPanel> = (props) => {
  const { endPhase } = props;
  const dispatch = useDispatch();

  const [hover, setHover] = useState<{
    token: boolean;
    noToken: boolean;
  }>({
    token: false,
    noToken: false,
  });

  // ======== CLASSES ==========================================================

  const tokenButtonClasses = cn({
    [styles.button]: true,
    [styles.hovered]: hover.token,
  });

  const noTokenButtonClasses = cn({
    [styles.button]: true,
    [styles.hovered]: hover.noToken,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.container}>
      <div
        className={styles.imageContainer}
        onClick={endPhase}
        onMouseEnter={() =>
          setHover((prevState) => ({ ...prevState, token: true }))
        }
        onMouseLeave={() =>
          setHover((prevState) => ({ ...prevState, token: false }))
        }
      >
        <img
          src={mecatolWithCustodian}
          alt="Mecatol Rex with Custodian Token"
        />
        <button className={tokenButtonClasses}>
          {hover.token
            ? "Proceed to the next round"
            : "Custodian Token still on Mecatol"}
        </button>
      </div>
      <div
        className={styles.imageContainer}
        onClick={() => dispatch(unlockAgendaPhase())}
        onMouseEnter={() =>
          setHover((prevState) => ({ ...prevState, noToken: true }))
        }
        onMouseLeave={() =>
          setHover((prevState) => ({ ...prevState, noToken: false }))
        }
      >
        <img
          src={mecatolWithoutCustodian}
          alt="Mecatol Rex without Custodian Token"
        />
        <button className={noTokenButtonClasses}>
          {hover.noToken
            ? "Proceed to the agenda phase"
            : "Custodian Token removed from Mecatol"}
        </button>
      </div>
    </div>
  );
};

export default CustodianPanel;
