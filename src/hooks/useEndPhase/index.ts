import views from "../../global/views";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { IPlayer } from "../../redux/players";
import { IRaces } from "../../redux/races";
import { IStrategyPhase } from "../../redux/strategyPhase";
import { ITimer } from "../../redux/timer";
import useEndActionPhase from "./actionPhase";
import useEndAgendaPhase from "./agendaPhase";
import useEndSetupPhase from "./setupPhase";
import useEndStatusPhase from "./statusPhase";
import useEndStrategyPhase from "./strategyPhase";

interface IProps {
  view: string;
  players: IPlayer[];
  timer: ITimer;
  races: IRaces;
  playerIndex: number;
  tableOrder: IPlayer[];
  agendaPhase: IAgendaPhase;
  strategyPhase: IStrategyPhase;
}

const useEndPhase = (props: IProps) => {
  const {
    view,
    players,
    timer,
    races,
    playerIndex,
    tableOrder,
    agendaPhase,
    strategyPhase,
  } = props;

  const endSetupPhase = useEndSetupPhase({ players, timer, races });
  const endStrategyPhase = useEndStrategyPhase({ players, races, playerIndex, strategyPhase });
  const endActionPhase = useEndActionPhase();
  const endStatusPhase = useEndStatusPhase({ players, tableOrder });
  const endAgendaPhase = useEndAgendaPhase({ players, timer, races, tableOrder, agendaPhase });

  const endPhase = () => {
    switch (view) {
      case views.setupPhase:
        endSetupPhase();
        break;
      case views.strategyPhase:
        endStrategyPhase();
        break;
      case views.actionPhase: 
        endActionPhase();
        break;
      case views.statusPhase:
        endStatusPhase();
        break;
      case views.agendaPhase:
        endAgendaPhase();
        break;
    }
  };

  return endPhase;
};

export default useEndPhase;
