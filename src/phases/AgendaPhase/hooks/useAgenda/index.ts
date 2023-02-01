import { useDispatch, useSelector } from "react-redux";
import triggers from "../../../../global/triggers";
import store, { RootState } from "../../../../redux";
import {
  beginVoting,
  resetAgendaRound,
  resetAppliedEffects,
  startSecondAgenda,
  switchHackElection,
  switchImperialArbiter,
  switchVotingStage,
} from "../../../../redux/agendaPhase";
import { setChoosePlayerAction } from "../../../../redux/choosePlayerAction";
import { setPlayerIndex } from "../../../../redux/playerIndex";
import {
  reorderPlayers,
  reorderPlayersWithArgentAsFirst,
} from "../../../../redux/players";
import { IPhaseProps } from "../../../../types";

const useAgenda = (props: IPhaseProps) => {
  const { handle } = props;
  const { players, tableOrder, agendaPhase, races } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

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
      handle.endPhase();
    }
  };

  const handleHackElection = () => {
    dispatch(switchHackElection());
  };

  const handlePoliticsRider = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
        trigger: triggers.politicsRiderActionCard,
      })
    );
  };

  const handlePublicExecution = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
        trigger: triggers.publicExecutionDirective,
      })
    );
  };

  const handleImperialArbiter = () => {
    dispatch(switchImperialArbiter());
  };

  return {
    handleAgendaPhase,
    handleHackElection,
    handlePoliticsRider,
    handlePublicExecution,
    handleImperialArbiter,
  };
};

export default useAgenda;
