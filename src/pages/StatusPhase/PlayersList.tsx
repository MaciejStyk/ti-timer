import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import themes from "../../global/themes";
import RenderTime from "../../components/RenderTime";
import cn from "classnames";
import styles from "./index.module.css";

const PlayersList = () => {
  const { players } = useSelector((state: RootState) => state);

  const leftBarContentClasses = cn({
    [styles.barContent]: true,
    [styles.left]: true,
  });

  const rightBarContentClasses = cn({
    [styles.barContent]: true,
    [styles.right]: true,
  });

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Initiative order:</h2>
      {players.map((player, index) => (
        <div
          key={player.id}
          style={player.theme}
          className={cn({
            [styles.bar]: true,
            [styles.blackPlayerBar]:
              player.theme.backgroundColor === themes[6].backgroundColor,
          })}
        >
          <div className={leftBarContentClasses}>{`${index + 1}. ${
            player.name
          }`}</div>
          <div className={rightBarContentClasses}>
            <RenderTime time={player.timeBank.min * 60 + player.timeBank.sec} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersList;
