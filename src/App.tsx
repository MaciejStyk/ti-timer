import { IPhaseProps } from "./types";
import useTime from "./hooks/useTime";
import useKeyBindings from "./hooks/useKeyBindings";
import useHandlers from "./hooks/useHandlers";
import RenderApp from "./pages";

const App = () => {
  const time = useTime();
  const handle = useHandlers(time);
  const phaseProps: IPhaseProps = { time, handle };
  useKeyBindings(phaseProps);

  return <RenderApp {...phaseProps} />;
};

export default App;
