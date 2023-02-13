import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import cn from "classnames";
import styles from "./index.module.css";
import useSwap from "../hooks/useSwap";

const Buttons: FunctionComponent<IPhaseProps> = (props) => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const beforeSwap = strategyPhase.swapCards.beforeSwap;
  const { handleCancel, handleAccept } = useSwap(props);

  const [hoverCancel, setHoverCancel] = useState<boolean>(false);
  const [hoverAccept, setHoverAccept] = useState<boolean>(false);

  const buttonContainerClasses = cn({
    [styles.buttonContainer]: true,
    [styles.maxWidth]: !beforeSwap,
  });

  return (
    <div className={buttonContainerClasses}>
      {beforeSwap && (
        <button
          className={styles.button}
          onClick={handleCancel}
          onMouseEnter={() => setHoverCancel(true)}
          onMouseLeave={() => setHoverCancel(false)}
        >
          {hoverCancel ? "Next phase" : "No"}
        </button>
      )}

      <button
        className={styles.button}
        onClick={handleAccept}
        onMouseEnter={() => setHoverAccept(true)}
        onMouseLeave={() => setHoverAccept(false)}
      >
        {beforeSwap ? (hoverAccept ? "Swap cards" : "Yes") : "Accept"}
      </button>
    </div>
  );
};

export default Buttons;
