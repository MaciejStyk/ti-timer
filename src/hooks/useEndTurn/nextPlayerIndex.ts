import store from "../../redux";

const useNextPlayerIndex = () => {
  const nextPlayerindex = () => {
    const { current, players, strategyAction } = store.getState();
    let nextPlayerIndex = 0;
    if (strategyAction.isBeingPlayed) {
      if (current.playerIndex < players.length - 1) {
        nextPlayerIndex = current.playerIndex + 1;
      }
    } else {
      if (current.playerIndex < players.length - 1) {
        nextPlayerIndex = players.findIndex(
          (player, index) => !player.passed && index > current.playerIndex
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
