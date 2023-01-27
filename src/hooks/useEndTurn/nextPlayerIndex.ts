import store from "../../redux";

const useNextPlayerIndex = () => {
  const nextPlayerindex = () => {
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
  };

  return nextPlayerindex;
};

export default useNextPlayerIndex;
