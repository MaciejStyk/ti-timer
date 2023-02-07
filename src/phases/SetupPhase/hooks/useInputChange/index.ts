import { useDispatch } from "react-redux";
import {
  setArgentInGame,
  setArgentPlayer,
  setNaaluInGame,
  setNaaluTokenChangeable,
} from "../../../../redux/reducers/settings/races";
import {
  setTimeAddedPerRoundMin,
  setTimeAddedPerRoundSec,
  setTimeBankMin,
  setTimeBankSec,
  setTimeDelayedPerTurnMin,
  setTimeDelayedPerTurnSec,
} from "../../../../redux/reducers/settings/timer";
import { inputName } from "../../../../global/inputs";

const useInputChange = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case inputName.timeBankMin:
        dispatch(setTimeBankMin(+event.target.value));
        break;
      case inputName.timeBankSec:
        dispatch(setTimeBankSec(+event.target.value));
        break;
      case inputName.timeAddedPerRoundMin:
        dispatch(setTimeAddedPerRoundMin(+event.target.value));
        break;
      case inputName.timeAddedPerRoundSec:
        dispatch(setTimeAddedPerRoundSec(+event.target.value));
        break;
      case inputName.timeDelayedPerTurnMin:
        dispatch(setTimeDelayedPerTurnMin(+event.target.value));
        break;
      case inputName.timeDelayedPerTurnSec:
        dispatch(setTimeDelayedPerTurnSec(+event.target.value));
        break;
      case inputName.naaluInGame:
        dispatch(setNaaluInGame(event.target.checked));
        dispatch(setNaaluTokenChangeable(event.target.checked));
        break;
      case inputName.argentInGame:
        dispatch(setArgentInGame(event.target.checked));
        if (!event.target.checked) {
          dispatch(setArgentPlayer(null));
        }
        break;
    }
  };

  return handleInputChange;
};

export default useInputChange;
