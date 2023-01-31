import { FunctionComponent } from "react";
import { GithubPicker } from "react-color";
import useColorPicker from "../hooks/useColorPicker";
import cn from "classnames";
import styles from "./index.module.css";

interface IColorPicker {
  color: string;
  colorsArray: string[];
  changeColor: (color: string) => void;
  bigger: boolean;
}

const ColorPicker: FunctionComponent<IColorPicker> = (props) => {
  const { color, colorsArray, changeColor, bigger } = props;

  const {
    displayColorPicker,
    switchColorPicker,
    closeColorPicker,
    changeColorInsidePicker,
  } = useColorPicker({ colorsArray, changeColor });

  const colorPickerClasses = cn({
    [styles.colorPicker]: true,
    [styles.bigger]: bigger,
  });

  const buttonClasses = cn({
    [styles.button]: true,
    [styles.noHover]: colorsArray.length === 0,
  });

  return (
    <div className={colorPickerClasses}>
      <button
        type="button"
        className={buttonClasses}
        style={{ backgroundColor: color }}
        onClick={switchColorPicker}
      />
      {displayColorPicker && (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={closeColorPicker} />
          <GithubPicker
            color={color}
            colors={colorsArray}
            onChange={(color) => changeColorInsidePicker(color.hex)}
            width={"100px"}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
