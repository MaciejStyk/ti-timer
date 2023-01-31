import { useSelector } from "react-redux";
import { inputType } from "../../../global/inputs";
import { RootState } from "../../../redux";
import ColorPicker from "../ColorPicker";
import styles from "./index.module.css";
import usePlayerForm from "../hooks/usePlayerForm";

const PlayerForm = () => {
  const { players, colors } = useSelector((state: RootState) => state);

  const {
    color,
    inputValue,
    changeColor,
    handleInputChange,
    handleSubmitForm,
    handleAddPlayer,
  } = usePlayerForm();

  return (
    <form className={styles.playerForm} onSubmit={handleSubmitForm}>
      <input
        type={inputType.text}
        value={inputValue}
        onChange={handleInputChange}
        className={styles.formInput}
      />

      <ColorPicker
        color={color}
        colorsArray={colors}
        changeColor={changeColor}
        bigger={true}
      />

      <button
        type={inputType.submit}
        onClick={handleAddPlayer}
        className={
          players.length < 8 ? styles.actionButton : styles.disabledButton
        }
      >
        Add player
      </button>
    </form>
  );
};

export default PlayerForm;
