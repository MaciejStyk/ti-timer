import { FunctionComponent } from "react";

interface IProps {
  time: number;
}

const RenderTime: FunctionComponent<IProps> = (props) => {
  const { time } = props;

  const renderedTime = Math.abs(time);

  const hours = Math.floor(renderedTime / 3600);
  const minutes = Math.floor((renderedTime % 3600) / 60);
  const seconds = Math.floor((renderedTime % 3600) % 60);

  const hoursSpan = <span>{hours < 10 ? "0" + hours : hours}</span>;
  const minutesSpan = <span>{minutes < 10 ? "0" + minutes : minutes}</span>;
  const secondsSpan = <span>{seconds < 10 ? "0" + seconds : seconds}</span>;

  return (
    <>
      {time < 0 && "-"}
      {hours > 0 ? (
        <>
          {hoursSpan}:{minutesSpan}h
        </>
      ) : (
        <>
          {minutesSpan}:{secondsSpan}
        </>
      )}
    </>
  );
};

export default RenderTime;
