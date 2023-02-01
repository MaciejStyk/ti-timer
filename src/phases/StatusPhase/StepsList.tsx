import cn from "classnames";
import styles from "./index.module.css";

const StepsList = () => {
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

  const stepBarClasses = cn({
    [styles.bar]: true,
    [styles.stepBar]: true,
  });

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Steps:</h2>
      {stepsArray.map((step, index) => (
        <div key={index} className={stepBarClasses}>
          <div className={styles.barContent}>{`${index + 1}. ${step}`}</div>
        </div>
      ))}
    </div>
  );
};

export default StepsList;
