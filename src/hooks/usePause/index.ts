import { ITime } from "../../types";

const usePause = (time: ITime) => {
  const pause = () => {
    if (time.isRunning) {
      time.bank.pause();
      time.elapsed.pause();
      time.delayed.pause();
    } else {
      if (time.delayed.value > 0) {
        time.delayed.start();
      } else {
        time.elapsed.start();
        time.bank.start();
      }
    }
  };

  return pause;
};

export default usePause;
