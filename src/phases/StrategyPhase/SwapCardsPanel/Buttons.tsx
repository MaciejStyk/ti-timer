import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { IPhaseProps } from "../../../types";
import useSwapCancel from "../hooks/useSwapCancel";
import useSwapAccept from "../hooks/useSwapAccept";
import cn from "classnames";
import styles from "./index.module.css";

const Buttons: FunctionComponent<IPhaseProps> = (props) => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const beforeSwap = strategyPhase.swapCards.beforeSwap;

  const [hoverCancel, setHoverCancel] = useState<boolean>(false);
  const [hoverAccept, setHoverAccept] = useState<boolean>(false);

  const handleCancel = useSwapCancel(props);
  const handleAccept = useSwapAccept(props);

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
