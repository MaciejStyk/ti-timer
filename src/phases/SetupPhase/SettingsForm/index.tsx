import { useSelector } from "react-redux";
import { inputName, inputType } from "../../../global/inputs";
import { RootState } from "../../../redux";
import ColorPicker from "../ColorPicker";
import useInputChange from "../hooks/useInputChange";
import useChangeColor from "../hooks/useChangeColor";
import styles from "./index.module.css";

const SettingsForm = () => {
  const { settings, players } = useSelector((state: RootState) => state);

  const colorsArray = players.map((player) => player.theme.backgroundColor);
  const color =
    settings.races.argent.playedBy?.theme.backgroundColor || "ffffff";

  const changeColor = useChangeColor();
  const handleInputChange = useInputChange();

  return (
    <div className={styles.settingsForm}>
      <span>Starting time bank:</span>
      <input
        type={inputType.number}
        name={inputName.timeBankMin}
        min="0"
        value={settings.timer.timeBank.min}
        onChange={handleInputChange}
      />
      min
      <input
        type={inputType.number}
        name={inputName.timeBankSec}
        min="0"
        value={settings.timer.timeBank.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Time added per round:</span>
      <input
        type={inputType.number}
        name={inputName.timeAddedPerRoundMin}
        value={settings.timer.timeAddedPerRound.min}
        onChange={handleInputChange}
      />
      min
      <input
        type={inputType.number}
        name={inputName.timeAddedPerRoundSec}
        value={settings.timer.timeAddedPerRound.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Time delayed per turn:</span>
      <input
        type={inputType.number}
        name={inputName.timeDelayedPerTurnMin}
        min="0"
        value={settings.timer.timeDelayedPerTurn.min}
        onChange={handleInputChange}
      />
      min
      <input
        type={inputType.number}
        name={inputName.timeDelayedPerTurnSec}
        min="0"
        value={settings.timer.timeDelayedPerTurn.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Naalu Collective in game:</span>
      <input
        type={inputType.checkbox}
        name={inputName.naaluInGame}
        checked={settings.races.naalu.inGame}
        onChange={handleInputChange}
      ></input>
      <span className={styles.empty}></span>
      <span>Argent Flight in game:</span>
      <input
        type={inputType.checkbox}
        name={inputName.argentInGame}
        checked={settings.races.argent.inGame}
        onChange={handleInputChange}
      ></input>
      {settings.races.argent.inGame && <span>Player:</span>}
      {settings.races.argent.inGame && (
        <ColorPicker
          color={color}
          colorsArray={colorsArray}
          changeColor={changeColor}
          bigger={false}
        />
      )}
      <span className={styles.empty}></span>
      <span>Winnu or Hacan in game:</span>
      <input
        type={inputType.checkbox}
        name={inputName.winnuOrHacanInGame}
        checked={settings.races.winnuOrHacan.inGame}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

export default SettingsForm;
