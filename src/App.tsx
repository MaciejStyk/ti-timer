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
import { useTimer } from "./hooks/useTimer";
import views from "./global/views";
import { IGameProps } from "./types";
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

  const {
    time: timeDelayed,
    start: startTimeDelayed,
    pause: pauseTimeDelayed,
    reset: resetTimeDelayed,
    status: timeDelayedStatus,
  } = useTimer({
    initialTime:
      timer.timeDelayedPerTurn.min * 60 + timer.timeDelayedPerTurn.sec,
    endTime: 0,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      if (!delayTimeHasEnded) {
        startTimeBank();
        startTimeElapsed();
        setDelayTimeHasEnded(true);
      }
    },
  });

  const {
    time: timeElapsed,
    start: startTimeElapsed,
    pause: pauseTimeElapsed,
    reset: resetTimeElapsed,
  } = useTimer({
    initialTime: 0,
  });

  const [initialTimeBank, setInitialTimeBank] = useState(
    timer.timeBank.min * 60 + timer.timeBank.sec
  );

  const {
    time: timeBank,
    start: startTimeBank,
    pause: pauseTimeBank,
    reset: resetTimeBank,
    status: timeBankStatus,
  } = useTimer({
    initialTime: initialTimeBank,
    timerType: "DECREMENTAL",
  });

  const isRunning =
    timeBankStatus === "RUNNING" || timeDelayedStatus === "RUNNING";

  const handlePause = useCallback(() => {
    if (isRunning) {
      pauseTimeBank();
      pauseTimeElapsed();
      pauseTimeDelayed();
    } else {
      if (timeDelayed > 0) {
        startTimeDelayed();
      } else {
        startTimeElapsed();
        startTimeBank();
      }
    }
  }, [
    isRunning,
    pauseTimeBank,
    pauseTimeDelayed,
    pauseTimeElapsed,
    startTimeBank,
    startTimeDelayed,
    startTimeElapsed,
    timeDelayed,
  ]);

  useEffect(() => {
    setInitialTimeBank(
      currentPlayer
        ? currentPlayer.timeBank.min * 60 + currentPlayer.timeBank.sec
        : timer.timeBank.min * 60 + timer.timeBank.sec
    );
    setDelayTimeHasEnded(false);
    resetTimeDelayed();
    resetTimeElapsed();
    resetTimeBank();
    if (
      (view === views.strategyPhase &&
        !races.naalu.tokenBeingChanged &&
        !strategyPhase.swapCards.isBeingPlayed) ||
      view === views.actionPhase ||
      (view === views.agendaPhase && agendaPhase.isBeingVoted)
    ) {
      startTimeDelayed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    view,
    currentPlayer?.id,
    resetTimeBank,
    startTimeBank,
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
              sortPlayersByInitiative({ naaluInGame: races.naalu.inGame })
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
              timeBank > 0
                ? Math.floor(timeBank / 60)
                : Math.ceil(timeBank / 60),
            sec:
              timeBank > 0
                ? Math.floor(timeBank % 60)
                : Math.ceil(timeBank % 60),
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
    timeBank,
    view,
  ]);

  const [nextTurnDisabled, setNextTurnDisabled] = useState(true);

  useEffect(() => {
    switch (view) {
      case views.strategyPhase:
        setNextTurnDisabled(
          !isRunning ||
            currentPlayer?.strategyCards.length !== strategyPhase.round
        );
        break;
      case views.actionPhase:
        setNextTurnDisabled(!isRunning || choosePlayerAction.playable);
        break;
      default:
        setNextTurnDisabled(!isRunning);
    }
  }, [
    currentPlayer?.strategyCards.length,
    strategyPhase.round,
    choosePlayerAction.playable,
    strategyPhase.numberOfRounds,
    view,
    isRunning,
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
    switch (view) {
      case views.actionPhase:
        setPassDisabled(
          !isRunning ||
            strategyAction.isBeingPlayed ||
            (currentPlayer
              ? currentPlayer!.strategyCards.some((card) => !card.exhausted)
              : true)
        );
        break;
      default:
        setPassDisabled(true);
    }
  }, [
    currentPlayer?.strategyCards.length,
    isRunning,
    view,
    strategyAction.isBeingPlayed,
    currentPlayer,
  ]);

  // ======== KEY BINDINGS =====================================================

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (view === views.strategyPhase &&
          !races.naalu.tokenBeingChanged &&
          !strategyPhase.swapCards.isBeingPlayed) ||
        view === views.actionPhase ||
        (view === views.agendaPhase && agendaPhase.isBeingVoted)
      ) {
        if (
          !event.ctrlKey &&
          (event.code === "Enter" || event.code === "NumpadEnter")
        ) {
          if (!nextTurnDisabled) {
            event.preventDefault();
            handleEndTurn();
          }
        }
        if (event.code === "Space") {
          event.preventDefault();
          handlePause();
        }
      }
      if (view === views.actionPhase && !passDisabled) {
        if (event.ctrlKey && event.code === "Enter") {
          event.preventDefault();
          handlePass();
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [
    view,
    nextTurnDisabled,
    isRunning,
    handleEndTurn,
    handlePause,
    agendaPhase.isBeingVoted,
    passDisabled,
    handlePass,
    races.naalu.tokenBeingChanged,
    strategyPhase.swapCards.isBeingPlayed,
  ]);

  // ======== RENDER APP =======================================================

  const gameProps: IGameProps = {
    isRunning,
    timeDelayed,
    timeElapsed,
    timeBank,
    handlePause,
    handleEndTurn,
    handlePass,
    nextTurnDisabled,
    passDisabled,
    endPhase,
  };

  const renderApp = () => {
    switch (view) {
      case views.setupPhase:
        return <SetupPhase endPhase={endPhase} />;
      case views.strategyPhase:
        return <StrategyPhase {...gameProps} />;
      case views.actionPhase:
        return <ActionPhase {...gameProps} />;
      case views.statusPhase:
        return <StatusPhase endPhase={endPhase} />;
      case views.agendaPhase:
        return <AgendaPhase {...gameProps} />;
    }
  };

  return <>{renderApp()}</>;
};

export default App;
