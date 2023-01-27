import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "./redux";
import {
  addTimeToAllPlayersAfterRound,
  passPlayer,
  removeAllStrategyCards,
  reorderPlayers,
  sortPlayersByInitiative,
  sortPlayersStrategyCards,
  unpassPlayers,
  updatePlayersTimebank,
} from "./redux/players";
import {
  resetAvailableStrategyCards,
  setStrategyPhaseNumberOfRounds,
  setStrategyPhaseRound,
  setSwapCardsBeingPlayed,
  setSwapCardsPlayable,
} from "./redux/strategyPhase";
import { setTableOrder } from "./redux/tableOrder";
import { setPlayersTimeBank } from "./redux/players";
import { changeView } from "./redux/view";
import { setPlayerIndex } from "./redux/playerIndex";
import { incrementGameRound } from "./redux/gameRound";
import views from "./global/views";
import { IPhaseProps } from "./types";
import { setRoundOrder } from "./redux/roundOrder";
import { resetStrategyAction } from "./redux/strategyAction";
import {
  setNaaluTokenBeingChanged,
  setNaaluTokenChangeable,
} from "./redux/races";
import { stopVoting, switchVotingStage } from "./redux/agendaPhase";
import SetupPhase from "./pages/SetupPhase";
import StrategyPhase from "./pages/StrategyPhase";
import ActionPhase from "./pages/ActionPhase";
import StatusPhase from "./pages/StatusPhase";
import AgendaPhase from "./pages/AgendaPhase";
import useTime from "./hooks/useTime";
import useKeyBindings from "./hooks/useKeyBindings";

const App = () => {
  const {
    view,
    players,
    timer,
    tableOrder,
    roundOrder,
    playerIndex,
    strategyAction,
    races,
    strategyPhase,
    agendaPhase,
    choosePlayerAction,
  } = useSelector((state: RootState) => state);
  const currentPlayer = players.length !== 0 ? players[playerIndex] : null;
  const dispatch = useDispatch();

  // ======== TIMER ============================================================

  const [delayTimeHasEnded, setDelayTimeHasEnded] = useState(false);

  const [initialTimeBank, setInitialTimeBank] = useState(
    timer.timeBank.min * 60 + timer.timeBank.sec
  );

  const time = useTime({
    timer,
    delayTimeHasEnded,
    setDelayTimeHasEnded,
    initialTimeBank,
  });

  // ======== TIMER FUNCTIONS ==================================================

  const handlePause = useCallback(() => {
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
  }, [time]);

  useEffect(() => {
    setInitialTimeBank(
      currentPlayer
        ? currentPlayer.timeBank.min * 60 + currentPlayer.timeBank.sec
        : timer.timeBank.min * 60 + timer.timeBank.sec
    );
    setDelayTimeHasEnded(false);
    time.delayed.reset();
    time.elapsed.reset();
    time.bank.reset();
    if (
      (view === views.strategyPhase &&
        !races.naalu.tokenBeingChanged &&
        !strategyPhase.swapCards.isBeingPlayed) ||
      view === views.actionPhase ||
      (view === views.agendaPhase && agendaPhase.isBeingVoted)
    ) {
      time.delayed.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    view,
    currentPlayer?.id,
    time.bank.reset,
    time.bank.start,
    agendaPhase.isBeingVoted,
    races.naalu.tokenBeingChanged,
    strategyPhase.swapCards.isBeingPlayed,
  ]);

  // ======== END PHASE ========================================================

  const endPhase = useCallback(() => {
    switch (view) {
      case views.setupPhase:
        dispatch(setTableOrder(players));
        dispatch(setPlayersTimeBank(timer.timeBank));
        dispatch(setStrategyPhaseNumberOfRounds(players.length <= 4 ? 2 : 1));
        dispatch(setSwapCardsPlayable(races.winnuOrHacan.inGame));
        dispatch(changeView(views.strategyPhase));
        break;

      case views.strategyPhase:
        if (playerIndex === players.length - 1) {
          if (strategyPhase.round < strategyPhase.numberOfRounds) {
            dispatch(setStrategyPhaseRound(2));
          } else if (
            !store.getState().races.naalu.tokenChangeable &&
            !store.getState().strategyPhase.swapCards.playable
          ) {
            dispatch(setPlayerIndex(0));
            dispatch(setStrategyPhaseRound(1));
            dispatch(sortPlayersStrategyCards());
            dispatch(
              sortPlayersByInitiative({
                naaluInGame: races.naalu.inGame,
              })
            );
            dispatch(setRoundOrder(store.getState().players));
            dispatch(changeView(views.actionPhase));
          }
        }
        break;

      case views.actionPhase: {
        const { players } = store.getState();
        if (players.every((player) => player.passed)) {
          dispatch(unpassPlayers());
          dispatch(changeView(views.statusPhase));
        }
        break;
      }

      case views.statusPhase:
        dispatch(removeAllStrategyCards());
        dispatch(resetAvailableStrategyCards());
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
        dispatch(changeView(views.agendaPhase));
        break;

      case views.agendaPhase:
        if (
          !agendaPhase.unlocked ||
          (!agendaPhase.beforeVoting && agendaPhase.round === 2)
        ) {
          dispatch(incrementGameRound());
          dispatch(setPlayerIndex(0));
          if (races.naalu.inGame) {
            dispatch(setNaaluTokenChangeable(true));
          }
          if (
            races.winnuOrHacan.inGame ||
            agendaPhase.appliedEffects.imperialArbiter
          ) {
            dispatch(setSwapCardsPlayable(true));
          }
          dispatch(
            reorderPlayers({
              startingPlayer:
                store.getState().players.find((player) => player.speaker) ||
                players[0],
              order: tableOrder,
            })
          );
          dispatch(unpassPlayers());
          dispatch(addTimeToAllPlayersAfterRound(timer.timeAddedPerRound));
          dispatch(changeView(views.strategyPhase));
        }
        break;
    }
  }, [
    view,
    dispatch,
    players,
    timer.timeBank,
    timer.timeAddedPerRound,
    races.winnuOrHacan.inGame,
    races.naalu.inGame,
    playerIndex,
    tableOrder,
    agendaPhase.unlocked,
    agendaPhase.beforeVoting,
    agendaPhase.round,
    agendaPhase.appliedEffects.imperialArbiter,
    strategyPhase.round,
    strategyPhase.numberOfRounds,
  ]);

  // ======== END TURN =========================================================

  const findNextPlayerindex = useCallback(() => {
    const { players, playerIndex, strategyAction } = store.getState();
    let nextPlayerIndex = 0;
    if (strategyAction.isBeingPlayed) {
      if (playerIndex < players.length - 1) {
        nextPlayerIndex = playerIndex + 1;
      }
    } else {
      if (playerIndex < players.length - 1) {
        nextPlayerIndex = players.findIndex(
          (player, index) => !player.passed && index > playerIndex
        );
        if (nextPlayerIndex < 0) {
          nextPlayerIndex = players.findIndex((player) => !player.passed);
        }
      } else {
        nextPlayerIndex = players.findIndex((player) => !player.passed);
      }
    }
    return nextPlayerIndex < 0 ? 0 : nextPlayerIndex;
  }, []);

  const handleEndTurn = useCallback(() => {
    if (currentPlayer) {
      dispatch(
        updatePlayersTimebank({
          id: currentPlayer.id,
          timeBank: {
            min:
              time.bank.value > 0
                ? Math.floor(time.bank.value / 60)
                : Math.ceil(time.bank.value / 60),
            sec:
              time.bank.value > 0
                ? Math.floor(time.bank.value % 60)
                : Math.ceil(time.bank.value % 60),
          },
        })
      );
    }

    if (strategyAction.isBeingPlayed && playerIndex === players.length - 1) {
      dispatch(
        reorderPlayers({
          startingPlayer: roundOrder[0],
          order: roundOrder,
        })
      );
      dispatch(
        setPlayerIndex(
          store
            .getState()
            .players.findIndex(
              (player) => player.id === strategyAction.playedBy!.id
            )
        )
      );
      dispatch(resetStrategyAction());
    }

    if (
      agendaPhase.isBeingVoted &&
      (playerIndex === players.length - 1 ||
        (playerIndex === players.length - 2 && players[playerIndex + 1].passed))
    ) {
      dispatch(stopVoting());
      dispatch(switchVotingStage());
    }

    if (
      view === views.strategyPhase &&
      strategyPhase.swapCards.playable &&
      playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setSwapCardsBeingPlayed(true));
    } else if (
      view === views.strategyPhase &&
      races.naalu.inGame &&
      playerIndex === players.length - 1 &&
      strategyPhase.round === strategyPhase.numberOfRounds
    ) {
      dispatch(setNaaluTokenBeingChanged(true));
    } else {
      dispatch(setPlayerIndex(findNextPlayerindex()));
    }

    endPhase();
  }, [
    agendaPhase.isBeingVoted,
    currentPlayer,
    dispatch,
    endPhase,
    findNextPlayerindex,
    playerIndex,
    players,
    races.naalu.inGame,
    roundOrder,
    strategyAction.isBeingPlayed,
    strategyAction.playedBy,
    strategyPhase.numberOfRounds,
    strategyPhase.round,
    strategyPhase.swapCards.playable,
    time.bank.value,
    view,
  ]);

  const [endTurnDisabled, setEndTurnDisabled] = useState(true);

  useEffect(() => {
    switch (view) {
      case views.strategyPhase:
        setEndTurnDisabled(
          !time.isRunning ||
            currentPlayer?.strategyCards.length !== strategyPhase.round
        );
        break;
      case views.actionPhase:
        setEndTurnDisabled(!time.isRunning || choosePlayerAction.playable);
        break;
      default:
        setEndTurnDisabled(!time.isRunning);
    }
  }, [
    currentPlayer?.strategyCards.length,
    strategyPhase.round,
    choosePlayerAction.playable,
    strategyPhase.numberOfRounds,
    view,
    time.isRunning,
  ]);

  // ======== PASS =============================================================

  const handlePass = useCallback(() => {
    if (currentPlayer) {
      dispatch(passPlayer(currentPlayer.id));
    }
    handleEndTurn();
  }, [currentPlayer, dispatch, handleEndTurn]);

  const [passDisabled, setPassDisabled] = useState(true);

  useEffect(() => {
    if (view === views.actionPhase) {
      setPassDisabled(
        !time.isRunning ||
          strategyAction.isBeingPlayed ||
          (currentPlayer
            ? currentPlayer!.strategyCards.some((card) => !card.exhausted)
            : true)
      );
    } else {
      setPassDisabled(true);
    }
  }, [
    currentPlayer?.strategyCards.length,
    time.isRunning,
    view,
    strategyAction.isBeingPlayed,
    currentPlayer,
  ]);

  // ======== KEY BINDINGS =====================================================

  useKeyBindings({
    view,
    time,
    races,
    handleEndTurn,
    endTurnDisabled,
    handlePause,
    handlePass,
    passDisabled,
    strategyPhase,
    agendaPhase,
  });

  // ======== RENDER APP =======================================================

  const phaseProps: IPhaseProps = {
    time,
    handlePause,
    handleEndTurn,
    endTurnDisabled,
    handlePass,
    passDisabled,
    endPhase,
  };

  const renderApp = () => {
    switch (view) {
      case views.setupPhase:
        return <SetupPhase {...phaseProps} />;
      case views.strategyPhase:
        return <StrategyPhase {...phaseProps} />;
      case views.actionPhase:
        return <ActionPhase {...phaseProps} />;
      case views.statusPhase:
        return <StatusPhase {...phaseProps} />;
      case views.agendaPhase:
        return <AgendaPhase {...phaseProps} />;
    }
  };

  return <>{renderApp()}</>;
};

export default App;
