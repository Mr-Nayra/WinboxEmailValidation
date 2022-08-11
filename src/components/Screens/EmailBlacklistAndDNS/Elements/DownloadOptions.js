import React from "react";
import Heading145 from "../../../UI/Heading/Heading";
import classes from "./DownloadOptions.module.css";

const Block = (props) => {
  const clickHandler = () => {};
  return (
    <button onClick={clickHandler} className={classes.button}>
      <h2 className={classes.heading}>{props.heading}</h2>
      <input type="checkbox" />
    </button>
  );
};
const DownloadOptions = () => {
  return (
    <div style={{ margin: "2vh  0" }}>
      <div className={classes.flexrow}>
        <input type="checkbox" className={classes.input} />
        <Heading145>Download everything</Heading145>
      </div>
      <div
        className={classes.flexrow}
        style={{ justifyContent: "space-between", marginTop: "1vh" }}
      >
        <Block heading="Deliverable" />
        <Block heading="Risky" />
        <Block heading="Undeliverable" />
        <Block heading="Unknown" />
      </div>
    </div>
  );
};

export default DownloadOptions;
