import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";
import { nanoid } from "nanoid";
import themes from "../../../../global/themes";
import { addPlayer } from "../../../../redux/players";
import { removeColor } from "../../../../redux/colors";

const usePlayerForm = () => {
  const { players, colors } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const [color, setColor] = useState<string>(colors[0]);

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

  return { color, inputValue, changeColor, handleInputChange, handleSubmitForm, handleAddPlayer };
};

export default usePlayerForm;
