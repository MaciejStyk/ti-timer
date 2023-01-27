import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IAgendaPhase {
  unlocked: boolean;
  beforeVoting: boolean;
  isBeingVoted: boolean;
  round: number;
  appliedEffects: {
    politicsRider: boolean;
    publicExecution: boolean;
    hackElection: boolean;
    imperialArbiter: boolean;
  };
}

const resetAgendaPhase = createAction("[Agenda Phase] Reset");
const unlockAgendaPhase = createAction("[Agenda Phase] Unlock");
const switchVotingStage = createAction("[Agenda Phase] Switch voting stage");
const beginVoting = createAction("[Agenda Phase] Begin voting");
const stopVoting = createAction("[Agenda Phase] Stop voting");
const startSecondAgenda = createAction("[Agenda Phase] Start second agenda");
const applyPoliticsRider = createAction("[Agenda Phase] Apply politics rider");
const applyPublicExecution = createAction("[Agenda Phase] Apply Public Execution");
const switchHackElection = createAction("[Agenda Phase] Switch Hack Election");
const switchImperialArbiter = createAction("[Agenda Phase] Switch Imperial Arbiter");
const resetAppliedEffects = createAction("[Agenda Phase] Reset applied effects");
const resetAgendaRound = createAction("[Agenda Phase] Reset agenda round");

const initialState: IAgendaPhase = {
  unlocked: false,
  beforeVoting: true,
  isBeingVoted: false,
  round: 1,
  appliedEffects: {
    politicsRider: false,
    publicExecution: false,
    hackElection: false,
    imperialArbiter: false,
  },
};

const agendaPhaseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetAgendaPhase, () => initialState)
    .addCase(unlockAgendaPhase, (state) => {
      state.unlocked = true;
    })
    .addCase(switchVotingStage, (state) => {
      state.beforeVoting = !state.beforeVoting;
    })
    .addCase(beginVoting, (state) => {
      state.isBeingVoted = true;
    })
    .addCase(stopVoting, (state) => {
      state.isBeingVoted = false;
    })
    .addCase(startSecondAgenda, (state) => {
      state.round = 2;
    })
    .addCase(applyPoliticsRider, (state) => {
      state.appliedEffects.politicsRider = true;
    })
    .addCase(applyPublicExecution, (state) => {
      state.appliedEffects.publicExecution = true;
    })
    .addCase(switchHackElection, (state) => {
      state.appliedEffects.hackElection = !state.appliedEffects.hackElection;
    })
    .addCase(switchImperialArbiter, (state) => {
      state.appliedEffects.imperialArbiter =
        !state.appliedEffects.imperialArbiter;
    })
    .addCase(resetAppliedEffects, (state) => {
      state.appliedEffects.hackElection = false;
      state.appliedEffects.politicsRider = false;
    })
    .addCase(resetAgendaRound, (state) => {
      return {
        ...state,
        beforeVoting: true,
        round: 1,
      };
    });
});

export {
  resetAgendaPhase,
  unlockAgendaPhase,
  switchVotingStage,
  
  beginVoting,
  stopVoting,
  startSecondAgenda,
  applyPoliticsRider,
  applyPublicExecution,
  switchHackElection,
  switchImperialArbiter,
  resetAppliedEffects,
  resetAgendaRound,
};

export default agendaPhaseReducer;
