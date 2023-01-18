import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../redux";
import {
  setTimeBankMin,
  setTimeBankSec,
  setTimeAddedPerRoundMin,
  setTimeAddedPerRoundSec,
  setTimeDelayedPerTurnMin,
  setTimeDelayedPerTurnSec,
} from "../../redux/timer";
import {
  setArgentInGame,
  setArgentPlayer,
  setNaaluInGame,
  setNaaluTokenChangeable,
  setWinnuOrHacanInGame,
} from "../../redux/races";
import styles from "./index.module.css";
import ColorPicker from "../ColorPicker";

const SettingsForm = () => {
  const { players, timer, races } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const colorsArray = players.map((player) => player.theme.backgroundColor);
  const color =
    store.getState().races.argent.playedBy?.theme.backgroundColor || "ffffff";

  // ======== FORM FUNCTIONS ===================================================

  const changeColor = (color: string) => {
    const argentPlayer = players.find(
      (player) => player.theme.backgroundColor === color
    );
    dispatch(setArgentPlayer(argentPlayer!));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "timeBankMin":
        dispatch(setTimeBankMin(+event.target.value));
        break;
      case "timeBankSec":
        dispatch(setTimeBankSec(+event.target.value));
        break;
      case "timeAddedPerRoundMin":
        dispatch(setTimeAddedPerRoundMin(+event.target.value));
        break;
      case "timeAddedPerRoundSec":
        dispatch(setTimeAddedPerRoundSec(+event.target.value));
        break;
      case "timeDelayedPerTurnMin":
        dispatch(setTimeDelayedPerTurnMin(+event.target.value));
        break;
      case "timeDelayedPerTurnSec":
        dispatch(setTimeDelayedPerTurnSec(+event.target.value));
        break;
      case "naaluInGame":
        dispatch(setNaaluInGame(event.target.checked));
        dispatch(setNaaluTokenChangeable(event.target.checked));
        break;
      case "argentInGame":
        dispatch(setArgentInGame(event.target.checked));
        if (!event.target.checked) {
          dispatch(setArgentPlayer(null));
        }
        break;
      case "winnuOrHacanInGame":
        dispatch(setWinnuOrHacanInGame(event.target.checked));
        break;
    }
  };

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.settingsForm}>
      <span>Starting time bank:</span>
      <input
        type="number"
        name="timeBankMin"
        min="0"
        value={timer.timeBank.min}
        onChange={handleInputChange}
      />
      min
      <input
        type="number"
        name="timeBankSec"
        min="0"
        value={timer.timeBank.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Time added per round:</span>
      <input
        type="number"
        name="timeAddedPerRoundMin"
        value={timer.timeAddedPerRound.min}
        onChange={handleInputChange}
      />
      min
      <input
        type="number"
        name="timeAddedPerRoundSec"
        value={timer.timeAddedPerRound.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Time delayed per turn:</span>
      <input
        type="number"
        name="timeDelayedPerTurnMin"
        min="0"
        value={timer.timeDelayedPerTurn.min}
        onChange={handleInputChange}
      />
      min
      <input
        type="number"
        name="timeDelayedPerTurnSec"
        min="0"
        value={timer.timeDelayedPerTurn.sec}
        onChange={handleInputChange}
      />
      sec
      <span>Naalu Collective in game:</span>
      <input
        type="checkbox"
        name="naaluInGame"
        checked={races.naalu.inGame}
        onChange={handleInputChange}
      ></input>
      <span className={styles.empty}></span>
      <span>Argent Flight in game:</span>
      <input
        type="checkbox"
        name="argentInGame"
        checked={races.argent.inGame}
        onChange={handleInputChange}
      ></input>
      {races.argent.inGame && <span>Player:</span>}
      {races.argent.inGame && (
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
        type="checkbox"
        name="winnuOrHacanInGame"
        checked={races.winnuOrHacan.inGame}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

export default SettingsForm;
