import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux";
import {
  setChoosePlayerAction,
  resetChoosePlayerAction,
} from "../../redux/choosePlayerAction";
import {
  IPlayer,
  passPlayer,
  reorderPlayers,
  setNaaluTokenHolder,
  setSpeaker,
  unpassPlayers,
} from "../../redux/players";
import {
  setNaaluTokenBeingChanged,
  setNaaluTokenChangeable,
} from "../../redux/races";
import themes from "../../global/themes";
import triggers from "../../global/triggers";
import cn from "classnames";
import styles from "./index.module.css";
import {
  applyPoliticsRider,
  applyPublicExecution,
} from "../../redux/agendaPhase";

interface IChoosePlayerPanel {
  trigger: string;
  endPhase?: () => void;
}

const ChoosePlayerPanel: FunctionComponent<IChoosePlayerPanel> = (props) => {
  const { trigger, endPhase } = props;
  const { players, playerIndex, tableOrder } = useSelector(
    (state: RootState) => state
  );
  const currentPlayer = players[playerIndex];
  const dispatch = useDispatch();

  const getTitle = () => {
    switch (trigger) {
      case triggers.politicsStrategyCard:
      case triggers.politicsRiderActionCard:
        return "Choose new speaker";
      case triggers.naaluTokenChange:
        return "Choose player with a naalu token";
      case triggers.publicExecutionDirective:
        return "Choose elected player";
    }
  };

  const playersToChooseFrom =
    trigger === triggers.politicsStrategyCard
      ? players.filter((player) => !player.speaker)
      : players;

  // ======== BUTTONS ==========================================================

  const [chosenPlayer, setChosenPlayer] = useState<IPlayer | null>(null);

  const handleCancel = () => {
    switch (trigger) {
      case triggers.politicsStrategyCard:
        dispatch(
          setChoosePlayerAction({
            playable: true,
            isBeingPlayed: false,
          })
        );
        break;

      case triggers.politicsRiderActionCard:
      case triggers.publicExecutionDirective:
        dispatch(resetChoosePlayerAction());
        break;
    }
  };

  const handleAccept = () => {
    if (chosenPlayer) {
      switch (trigger) {
        case triggers.politicsStrategyCard:
          dispatch(setSpeaker(chosenPlayer.id));
          dispatch(resetChoosePlayerAction());
          break;

        case triggers.politicsRiderActionCard:
          dispatch(setSpeaker(chosenPlayer.id));
          const speaker =
            store.getState().players.find((player) => player.speaker) ||
            players[0];
          const speakerIndex = tableOrder.findIndex(
            (player) => player.id === speaker.id
          );
          dispatch(
            reorderPlayers({
              startingPlayer:
                tableOrder[
                  speakerIndex < players.length - 1 ? speakerIndex + 1 : 0
                ],
              order: tableOrder,
            })
          );
          dispatch(applyPoliticsRider());
          dispatch(resetChoosePlayerAction());
          break;

        case triggers.naaluTokenChange:
          dispatch(setNaaluTokenHolder(chosenPlayer.id));
          dispatch(setNaaluTokenBeingChanged(false));
          dispatch(setNaaluTokenChangeable(false));
          endPhase!();
          break;

        case triggers.publicExecutionDirective:
          dispatch(unpassPlayers());
          dispatch(passPlayer(chosenPlayer.id));
          if (chosenPlayer.speaker) {
            const speakerIndex = tableOrder.findIndex(
              (player) => player.id === chosenPlayer.id
            );
            const newSpeakerIndex =
              speakerIndex < players.length - 1 ? speakerIndex + 1 : 0;
            let newSpeaker = tableOrder[newSpeakerIndex];
            dispatch(setSpeaker(newSpeaker.id));
            dispatch(
              reorderPlayers({
                startingPlayer:
                  tableOrder[
                    newSpeakerIndex < players.length - 1
                      ? newSpeakerIndex + 1
                      : 0
                  ],
                order: tableOrder,
              })
            );
          }
          dispatch(applyPublicExecution());
          dispatch(resetChoosePlayerAction());
          break;
      }
    }
  };

  // ======== CLASSES ==========================================================

  const choosePlayerPanelClasses = cn({
    [styles.choosePlayerPanel]: true,
    [styles.duringStrategyPhase]: trigger === triggers.naaluTokenChange,
    [styles.duringActionPhase]: trigger === triggers.politicsStrategyCard,
    [styles.duringAgendaPhase]:
      trigger === triggers.politicsRiderActionCard ||
      trigger === triggers.publicExecutionDirective,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div style={currentPlayer.theme} className={choosePlayerPanelClasses}>
      <h2>{getTitle()}</h2>
      <div className={styles.playerContainer}>
        {playersToChooseFrom.map((player) => (
          <div
            key={player.id}
            style={player.theme}
            className={cn({
              [styles.playerBar]: true,
              [styles.oneColumn]: players.length < 5,
              [styles.twoColumns]: players.length >= 5,
              [styles.chosen]: player.id === chosenPlayer?.id,
              [styles.whiteShadow]:
                player.theme.backgroundColor === themes[6].backgroundColor,
            })}
            onClick={() => setChosenPlayer(player)}
          >
            <div className={styles.playerBarContent}>{player.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {trigger !== triggers.naaluTokenChange && (
          <button className={styles.button} onClick={handleCancel}>
            Cancel
          </button>
        )}

        <button
          className={chosenPlayer ? styles.button : styles.disabledButton}
          onClick={handleAccept}
        >
          {trigger === triggers.naaluTokenChange ? "Next phase" : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default ChoosePlayerPanel;
