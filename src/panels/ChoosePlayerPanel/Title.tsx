import { FunctionComponent } from "react";
import useTitle from "./hooks/useTitle";

const Title: FunctionComponent = () => {
  const getTitle = useTitle();

  return <h2>{getTitle()}</h2>;
};

export default Title;
