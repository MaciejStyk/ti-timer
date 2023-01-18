import leadership from "../assets/strategy-cards/leadership.webp";
import leadershipBack from "../assets/strategy-cards/leadership-back.png";
import diplomacy from "../assets/strategy-cards/diplomacy.webp";
import diplomacyBack from "../assets/strategy-cards/diplomacy-back.png"
import politics from "../assets/strategy-cards/politics.webp";
import politicsBack from "../assets/strategy-cards/politics-back.png";
import construction from "../assets/strategy-cards/construction.webp";
import constructionBack from "../assets/strategy-cards/construction-back.png";
import trade from "../assets/strategy-cards/trade.webp";
import tradeBack from "../assets/strategy-cards/trade-back.png";
import warfare from "../assets/strategy-cards/warfare.webp";
import warfareBack from "../assets/strategy-cards/warfare-back.png";
import technology from "../assets/strategy-cards/technology.webp";
import technologyBack from "../assets/strategy-cards/technology-back.png";
import imperial from "../assets/strategy-cards/imperial.webp";
import imperialBack from "../assets/strategy-cards/imperial-back.png";

export interface IStrategyCard {
  id: number;
  name: string;
  url: string;
  urlBack: string;
  exhausted: boolean;
}

const strategyCards: IStrategyCard[] = [
  {
    id: 1,
    name: "Leadership",
    url: leadership,
    urlBack: leadershipBack,
    exhausted: false,
  },
  {
    id: 2,
    name: "Diplomacy",
    url: diplomacy,
    urlBack: diplomacyBack,
    exhausted: false,
  },
  {
    id: 3,
    name: "Politics",
    url: politics,
    urlBack: politicsBack,
    exhausted: false,
  },
  {
    id: 4,
    name: "Construction",
    url: construction,
    urlBack: constructionBack,
    exhausted: false,
  },
  {
    id: 5,
    name: "Trade",
    url: trade,
    urlBack: tradeBack,
    exhausted: false,
  },
  {
    id: 6,
    name: "Warfare",
    url: warfare,
    urlBack: warfareBack,
    exhausted: false,
  },
  {
    id: 7,
    name: "Technology",
    url: technology,
    urlBack: technologyBack,
    exhausted: false,
  },
  {
    id: 8,
    name: "Imperial",
    url: imperial,
    urlBack: imperialBack,
    exhausted: false,
  },
];

export default strategyCards;
