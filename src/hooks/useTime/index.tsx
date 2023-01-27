import { ITimer } from "../../redux/timer";
import { useTimer } from "../useTimer";

interface IProps {
  timer: ITimer;
  delayTimeHasEnded: boolean;
  setDelayTimeHasEnded: React.Dispatch<React.SetStateAction<boolean>>;
  initialTimeBank: number;
}

const useTime = (props: IProps) => {
  const { timer, delayTimeHasEnded, setDelayTimeHasEnded, initialTimeBank } =
    props;

  const delayed = useTimer({
    initialTime:
      timer.timeDelayedPerTurn.min * 60 + timer.timeDelayedPerTurn.sec,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      if (!delayTimeHasEnded) {
        bank.start();
        elapsed.start();
        setDelayTimeHasEnded(true);
      }
    },
  });

  const elapsed = useTimer({ initialTime: 0 });

  const bank = useTimer({
    initialTime: initialTimeBank,
    timerType: "DECREMENTAL",
  });

  const isRunning = bank.status === "RUNNING" || delayed.status === "RUNNING";

  return { delayed, elapsed, bank, isRunning };
};

export default useTime;
