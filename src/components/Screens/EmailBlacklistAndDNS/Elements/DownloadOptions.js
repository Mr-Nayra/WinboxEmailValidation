import React from "react";
import Heading145 from "../../../UI/Heading/Heading";
import classes from "./DownloadOptions.module.css";

const Block = (props) => {
  const clickHandler = () => {
    props.setDownloadEverything(false);
    props.onChange((prev) => !prev);
  };

  return (
    <button
      onClick={props.view ? clickHandler : null}
      className={classes.button}
    >
      <h2 className={classes.heading}>{props.heading}</h2>
      {props.view ? (
        <input type="checkbox" checked={props.value} />
      ) : (
        <Heading145>No items</Heading145>
      )}
    </button>
  );
};
const DownloadOptions = (props) => {
  return (
    <div style={{ margin: "2vh  0" }}>
      <div className={classes.flexrow}>
        <input
          type="checkbox"
          className={classes.input}
          onChange={props.downloadEverythingHandler}
          checked={props.downloadEverything}
        />
        <Heading145>Download everything</Heading145>
      </div>
      <div
        className={classes.flexrow}
        style={{ justifyContent: "space-between", marginTop: "1vh" }}
      >
        <Block
          view={props.options[0]}
          heading="Deliverable"
          value={props.deliverable}
          onChange={props.setDeliverable}
          setDownloadEverything={props.setDownloadEverything}
        />
        <Block
          view={props.options[1]}
          heading="Risky"
          value={props.risky}
          onChange={props.setRisky}
          setDownloadEverything={props.setDownloadEverything}
        />
        <Block
          view={props.options[2]}
          heading="Undeliverable"
          value={props.undeliverable}
          onChange={props.setUndeliverable}
          setDownloadEverything={props.setDownloadEverything}
        />
        <Block
          view={props.options[3]}
          heading="Unknown"
          value={props.unknown}
          onChange={props.setUnknown}
          setDownloadEverything={props.setDownloadEverything}
        />
      </div>
    </div>
  );
};

export default DownloadOptions;
