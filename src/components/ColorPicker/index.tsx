import { FunctionComponent, useState } from "react";
import { GithubPicker } from "react-color";
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

  // ======== CLASSES ==========================================================

  const colorPickerClasses = cn({
    [styles.colorPicker]: true,
    [styles.bigger]: bigger,
  });

  const buttonClasses = cn({
    [styles.button]: true,
    [styles.noHover]: colorsArray.length === 0,
  });

  // ======== RENDER COMPONENT =================================================

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
