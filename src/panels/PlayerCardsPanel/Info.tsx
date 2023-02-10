import { FunctionComponent } from "react";
import { IPlayer } from "../../redux/reducers/players";

interface IProps {
  player: IPlayer | undefined;
  isOver: boolean;
}

const Info: FunctionComponent<IProps> = (props) => {
  const { player, isOver } = props;

  return (
    <>
      {player?.strategyCards.length === 0 && !isOver && (
        <span>
          Press number, drag <br /> or double click <br /> strategy cards here
        </span>
      )}
    </>
  );
};

export default Info;
