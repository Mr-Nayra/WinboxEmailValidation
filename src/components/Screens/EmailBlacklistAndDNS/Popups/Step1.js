import React, { useState } from "react";
import classes from "./Step1.module.css";

import Heading from "../../../UI/Heading/Heading";
import Modal from "../../../UI/Modal/Modal";
import DelIcon from "../../../Icons/DelIcon";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";

const Step1 = (props) => {
  const [softwares, setSoftwares] = useState("Excel/CSV");

  const setSoftwareHandler = (event) => {
    setSoftwares(event.target.value);
  };

  const nextClickHandler = () => {
    props.next.function(props.next.value, softwares);
  };

  return (
    <Modal onClick={props.close.function.bind(this, props.close.value)}>
      <div className={classes.flexend}>
        <div>
          <DelIcon
            onClick={props.close.function.bind(this, props.close.value)}
          />
        </div>
      </div>
      <div>
        <Heading>
          Use Dropdown to select from where you want to import the data
        </Heading>
        <div className={classes.inputContainer}>
          <div>
            <p className={classes.parah}>Software</p>
            <p className={classes.asterik}>*</p>
          </div>
          <select
            className={classes.input}
            value={softwares}
            onChange={setSoftwareHandler}
          >
            <option value="Excel/CSV">Excel/CSV</option>
            <option value="Hubspot">Hubspot</option>
            <option value="Salesforce">Salesforce</option>
          </select>
        </div>
        <Heading>
          Note - "To import data from any third party integrations make sure to
          connect with it on the Third Party Integrations Page first."
        </Heading>
      </div>
      <div className={classes.flexcenterrow} style={{ marginTop: "3vh" }}>
        <BlueButton
          onClick={props.close.function.bind(this, props.close.value)}
        >
          Close
        </BlueButton>
        <Button onClick={nextClickHandler}>Next</Button>
      </div>
    </Modal>
  );
};

export default Step1;
