import { useState } from "react";

interface IProps {
  colorsArray: string[];
  changeColor: (color: string) => void;
}

const useColorPicker = (props: IProps) => {
  const { colorsArray, changeColor } = props;
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const switchColorPicker = () => {
    colorsArray.length > 0 && setDisplayColorPicker((prev) => !prev);
  };

  const closeColorPicker = () => {
    setDisplayColorPicker(false);
  };

  const changeColorInsidePicker = (color: string) => {
    changeColor(color);
    closeColorPicker();
  };

  return { displayColorPicker, switchColorPicker, closeColorPicker, changeColorInsidePicker };
};

export default useColorPicker;
