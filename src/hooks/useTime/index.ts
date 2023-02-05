import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useTimer } from "../useTimer";
import useTimeAutoReset from "./autoReset";

const useTime = () => {
  const { settings } = useSelector((state: RootState) => state);

  const [delayEnded, setDelayEnded] = useState(false);
  const [initialBank, setInitialBank] = useState(
    settings.timer.timeBank.min * 60 + settings.timer.timeBank.sec
  );

  const delayed = useTimer({
    initialTime:
      settings.timer.timeDelayedPerTurn.min * 60 +
      settings.timer.timeDelayedPerTurn.sec,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      if (!delayEnded) {
        bank.start();
        elapsed.start();
        setDelayEnded(true);
      }
    },
  });

  const elapsed = useTimer({ initialTime: 0 });

  const bank = useTimer({
    initialTime: initialBank,
    timerType: "DECREMENTAL",
  });

  const isRunning = bank.status === "RUNNING" || delayed.status === "RUNNING";
  const time = { delayed, elapsed, bank, isRunning };

  useTimeAutoReset({ time, setInitialBank, setDelayEnded });

  return { delayed, elapsed, bank, isRunning };
};

export default useTime;
