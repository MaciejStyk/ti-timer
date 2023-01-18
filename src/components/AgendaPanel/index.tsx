import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux";
import {
  reorderPlayers,
  reorderPlayersWithArgentAsFirst,
} from "../../redux/players";
import { setPlayerIndex } from "../../redux/playerIndex";
import {
  beginVoting,
  resetAgendaRound,
  resetAppliedEffects,
  startSecondAgenda,
  switchHackElection,
  switchImperialArbiter,
  switchVotingStage,
} from "../../redux/agendaPhase";
import { setChoosePlayerAction } from "../../redux/choosePlayerAction";
import themes from "../../global/themes";
import ChoosePlayerPanel from "../ChoosePlayerPanel";
import triggers from "../../global/triggers";
import cn from "classnames";
import styles from "./index.module.css";

interface IAgendaPanel {
  endPhase: () => void;
}

const AgendaPanel: FunctionComponent<IAgendaPanel> = (props) => {
  const { endPhase } = props;
  const { players, tableOrder, agendaPhase, choosePlayerAction, races } =
    useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const speaker =
    players.find((player) => player.speaker) ||
    store.getState().players.find((player) => player.speaker) ||
    players[0];

  const stepsArray = agendaPhase.beforeVoting
    ? [
        agendaPhase.round === 1 &&
          'Apply effects "at the start" of the agenda phase',
        "Speaker reveals and reads the Agenda",
        'Apply effects "when" an agenda is revealed',
        'Apply effects "after" an agenda is revealed',
        "Open discussion",
      ]
    : [
        "Resolve Outcome",
        'Apply effects "when" an agenda is resolved',
        'Apply effects "after" an agenda is resolved',
        agendaPhase.round === 2 && "Ready planets",
      ];

  // ======== BUTTONS ==========================================================

  const handleAgendaPhase = () => {
    const speaker =
      store.getState().players.find((player) => player.speaker) || players[0];
    const speakerIndex = tableOrder.findIndex(
      (player) => player.id === speaker.id
    );
    if (agendaPhase.beforeVoting) {
      if (agendaPhase.appliedEffects.hackElection) {
        dispatch(
          reorderPlayers({
            startingPlayer:
              tableOrder[
                speakerIndex === 0 ? players.length - 1 : speakerIndex - 1
              ],
            order: tableOrder,
            clockwise: false,
          })
        );
      }
      if (races.argent.inGame && races.argent.playedBy) {
        dispatch(reorderPlayersWithArgentAsFirst(races.argent.playedBy));
      }
      if (store.getState().players[0].passed) {
        dispatch(setPlayerIndex(1));
      }
      dispatch(beginVoting());
    } else if (agendaPhase.round === 1) {
      if (agendaPhase.appliedEffects.hackElection) {
        dispatch(
          reorderPlayers({
            startingPlayer:
              tableOrder[
                speakerIndex < players.length - 1 ? speakerIndex + 1 : 0
              ],
            order: tableOrder,
          })
        );
      }
      dispatch(resetAppliedEffects());
      dispatch(startSecondAgenda());
      dispatch(switchVotingStage());
    } else {
      dispatch(resetAppliedEffects());
      dispatch(resetAgendaRound());
      endPhase();
    }
  };

  const [currentTrigger, setCurrentTrigger] = useState<string>("");

  const openChoosePlayerPanel = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
      })
    );
  };

  const handleHackElection = () => {
    dispatch(switchHackElection());
  };

  const handlePoliticsRider = () => {
    openChoosePlayerPanel();
    setCurrentTrigger(triggers.politicsRiderActionCard);
  };

  const handlePublicExecution = () => {
    openChoosePlayerPanel();
    setCurrentTrigger(triggers.publicExecutionDirective);
  };

  const handleImperialArbiter = () => {
    dispatch(switchImperialArbiter());
  };

  // ======== CLASSES ==========================================================

  const speakerBarClasses = cn({
    [styles.bar]: true,
    [styles.blackSpeakerBar]:
      speaker.theme.backgroundColor === themes[6].backgroundColor,
  });

  const stepBarClasses = cn({
    [styles.bar]: true,
    [styles.stepBar]: true,
  });

  const hackElectionButtonClasses = cn({
    [styles.button]: true,
    [styles.wider]: true,
    [styles.active]: agendaPhase.appliedEffects.hackElection,
  });

  const imperialArbiterButtonClasses = cn({
    [styles.button]: true,
    [styles.wider]: true,
    [styles.active]: agendaPhase.appliedEffects.imperialArbiter,
  });

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.container}>
      {choosePlayerAction.isBeingPlayed && (
        <ChoosePlayerPanel trigger={currentTrigger} />
      )}
      {!choosePlayerAction.isBeingPlayed && (
        <>
          <div className={styles.list}>
            <h2 className={styles.title}>Speaker:</h2>
            <div style={speaker.theme} className={speakerBarClasses}>
              <div className={styles.barContent}>{speaker.name}</div>
            </div>
          </div>

          <div className={styles.list}>
            <h2 className={styles.title}>
              Steps {agendaPhase.beforeVoting ? "before" : "after"} voting:
            </h2>
            {stepsArray.filter(Boolean).map((step, index) => (
              <div
                key={index}
                className={stepBarClasses}
                style={{ background: "" }}
              >
                <div className={styles.barContent}>{`${
                  index + 1
                }. ${step}`}</div>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            {agendaPhase.beforeVoting && (
              <button
                className={hackElectionButtonClasses}
                onClick={handleHackElection}
              >
                {agendaPhase.appliedEffects.hackElection
                  ? "Election hacked"
                  : "Hack Election"}
              </button>
            )}

            {!agendaPhase.beforeVoting && (
              <button
                className={imperialArbiterButtonClasses}
                onClick={handleImperialArbiter}
              >
                {agendaPhase.appliedEffects.imperialArbiter
                  ? "Arbiter elected"
                  : "Imperial Arbiter"}
              </button>
            )}

            {!agendaPhase.beforeVoting &&
              !agendaPhase.appliedEffects.politicsRider && (
                <button className={styles.button} onClick={handlePoliticsRider}>
                  Politics Rider
                </button>
              )}

            {!agendaPhase.beforeVoting &&
              !agendaPhase.appliedEffects.publicExecution && (
                <button
                  className={styles.button}
                  onClick={handlePublicExecution}
                >
                  Public execution
                </button>
              )}

            <button className={styles.button} onClick={handleAgendaPhase}>
              {agendaPhase.beforeVoting
                ? "Begin voting"
                : agendaPhase.round === 1
                ? "Second agenda"
                : "Next round"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgendaPanel;
