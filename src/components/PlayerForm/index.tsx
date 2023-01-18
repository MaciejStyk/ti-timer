import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../redux";
import { addPlayer } from "../../redux/players";
import { nanoid } from "nanoid";
import themes from "../../global/themes";
import ColorPicker from "../ColorPicker";
import styles from "./index.module.css";
import { removeColor } from "../../redux/colors";

const PlayerForm = () => {
  const { players, colors } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const [color, setColor] = useState<string>(colors[0]);

  // ======== FORM FUNCTIONS ===================================================

  const changeColor = (color: string) => {
    setColor(color);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleAddPlayer();
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      id: nanoid(),
      name: inputValue,
      theme: themes.find(
        (theme) => theme.backgroundColor.toUpperCase() === color.toUpperCase()
      )!,
      strategyCards: [],
      timeBank: {
        min: 0,
        sec: 0,
      },
      speaker: players.length === 0,
      passed: false,
    };
    if (newPlayer.name && players.length < 8) {
      dispatch(addPlayer(newPlayer));
      dispatch(removeColor(color));
      setColor(store.getState().colors[0] || "transparent");
    }
    setInputValue("");
  };

  useEffect(() => {
    if (players.length === 7) {
      setColor(colors[0]);
    }
  }, [colors, players.length]);

  // ======== RENDER COMPONENT =================================================

  return (
    <form className={styles.playerForm} onSubmit={handleSubmitForm}>
      <input
        type="text"
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
        type="submit"
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
