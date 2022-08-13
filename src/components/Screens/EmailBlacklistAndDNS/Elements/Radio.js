import React, { useState } from "react";
import Heading145 from "../../../UI/Heading/Heading";
import classes from "./Radio.module.css";

const Checkboxes = (props) => {
  const radioHandler = (value) => {
    props.setSelectedFormat(value);
  };

  return (
    <div className={classes.container}>
      <div style={{ flex: 1, margin: "0 0.25vw" }}>
        <div className={classes.flexrow}>
          <input
            className={classes.input}
            type="radio"
            value="csv"
            name="fileFormat"
            checked={props.selectedFormat === 1}
            onChange={radioHandler.bind(this, 1)}
          />
          <Heading145>CSV</Heading145>
        </div>
        <p className={classes.parah}>
          Comma-seperated values on ubiquitos format conpatible with most
          spreadsheets and database softwares
        </p>
      </div>
      <div style={{ flex: 1, margin: "0 0.25vw" }}>
        <div className={classes.flexrow}>
          <input
            className={classes.input}
            type="radio"
            value="xlsx"
            name="fileFormat"
            checked={props.selectedFormat === 2}
            onChange={radioHandler.bind(this, 2)}
          />
          <Heading145>Excel (.xlsx)</Heading145>
        </div>
        <p className={classes.parah}>
          Microsoft Excel spreadsheet, compatible with Microsoft Office version
          2007 or newer
        </p>
      </div>
      <div style={{ flex: 1, margin: "0 0.25vw" }}>
        <div className={classes.flexrow}>
          <input
            className={classes.input}
            type="radio"
            value="xls"
            name="fileFormat"
            checked={props.selectedFormat === 3}
            onChange={radioHandler.bind(this, 3)}
          />
          <Heading145>Excel 97-2003 (.xls)</Heading145>
        </div>
        <p className={classes.parah}>
          Microsoft Excel spreadsheet, compatible with legacy Microsoft office
          up until version 2007
        </p>
      </div>
    </div>
  );
};

export default Checkboxes;
