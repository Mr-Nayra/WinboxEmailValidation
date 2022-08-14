import { useState } from "react";
import classes from "./ColHead.module.css";
import ArrowIcon from "../../../Icons/ArrowIcon";

const ColHead = (props) => {
  const [rotation, setRotation] = useState(false);

  const clickHandler = () => {
    props.onClick(rotation);
    setRotation((prev) => !prev);
  };

  return (
    <div className={`${classes.flex} ${props.className}`} style={props.style}>
      <div>
        <p className={classes.para}>{props.children}</p>
      </div>
      {!props.noArrow && (
        <button
          className={`${classes.icon} ${
            rotation ? classes.close : classes.open
          }`}
          onClick={clickHandler}
        >
          <ArrowIcon />
        </button>
      )}
    </div>
  );
};

export default ColHead;
