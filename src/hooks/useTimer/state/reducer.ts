import { State } from '../types';
import { TimerActionsType } from './actions';

function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {
    case 'advanceTime': {
      const { timeToAdd } = action.payload;

      return {
        ...state,
        value:
          state.timerType === 'DECREMENTAL'
            ? state.value - timeToAdd
            : state.value + timeToAdd,
      };
    }
    case 'pause': {
      return {
        ...state,
        status: 'PAUSED',
      };
    }
    case 'reset': {
      return {
        ...state,
        status: 'STOPPED',
        value: action.payload.initialTime,
      };
    }
    case 'set': {
      return {
        ...state,
        value: action.payload.newTime,
      };
    }
    case 'start': {
      const { initialTime } = action.payload;

      return {
        ...state,
        status: 'RUNNING',
        value: state.status === 'STOPPED' ? initialTime : state.value,
      };
    }
    case 'stop': {
      return {
        ...state,
        status: 'STOPPED',
      };
    }
    default:
      return state;
  }
}

export default reducer;
