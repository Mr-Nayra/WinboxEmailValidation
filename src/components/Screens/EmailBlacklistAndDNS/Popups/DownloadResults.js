import React from "react";

import Heading145, { Heading186 } from "../../../UI/Heading/Heading";
import Modal from "../../../UI/Modal/Modal";
import DelIcon from "../../../Icons/DelIcon";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";
import classes from "./DownloadResults.module.css";
import Checkboxes from "../Elements/Checkboxes";
import DownloadOptions from "../Elements/DownloadOptions";

const DownloadResults = (props) => {
  return (
    <Modal onClick={props.close.function.bind(this, props.close.value)}>
      <div className={classes.flexspace} style={{ marginBottom: "1vh" }}>
        <Heading186
          onClick={props.close.function.bind(this, props.close.value)}
        >
          Download Results
        </Heading186>
        <DelIcon onClick={props.close.function.bind(this, props.close.value)} />
      </div>
      <Heading145>
        Choose which results you wish to download and adjust your preferences
      </Heading145>
      <DownloadOptions />
      <Heading145 style={{ fontWeight: 600, marginTop: "1vh" }}>
        File Format
      </Heading145>
      <Checkboxes />
      <div className={classes.flexspace} style={{marginTop: "2vh"}}>
        <BlueButton
          onClick={props.close.function.bind(this, props.close.value)}
        >
          Close
        </BlueButton>
        <Button>Download</Button>
      </div>
    </Modal>
  );
};

export default DownloadResults;
