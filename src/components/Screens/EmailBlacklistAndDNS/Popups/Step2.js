import { useState } from "react";
import classes from "./Step2.module.css";

import DelIcon from "../../../Icons/DelIcon";
import Modal from "../../../UI/Modal/Modal";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";
import Heading145 from "../../../UI/Heading/Heading";

const Runtest = (props) => {
  const [file, setFile] = useState("No file selected");

  const uploadFileHandler = (event) => {
    setFile(event.target.files[0].name);
  };

  return (
    <>
      <Modal onClick={props.close.function.bind(this, props.close.value)}>
        <div className={classes.flexend}>
          <div>
            <DelIcon
              onClick={props.close.function.bind(this, props.close.value)}
            />
          </div>
        </div>
        {props.software === "Excel/CSV" ? (
          <div>
            <Heading145>xls,xlsx and csv file supported:</Heading145>
            <div>
              <p className={classes.parah}>Upload a file</p>
            </div>
            <div class="inputfile-box">
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={uploadFileHandler}
              />
              <label
                for="file"
                style={{
                  display: "flex",
                  marginTop: "1vh",
                  alignItems: "center",
                }}
              >
                <div className={classes.input}>{file}</div>
                <div class={classes.button}>Select File</div>
              </label>
            </div>
          </div>
        ) : (
          <div>
            <Heading145>{props.software}</Heading145>
          </div>
        )}
        <div className={classes.flexcenterrow} style={{ marginTop: "3vh" }}>
          <BlueButton
            onClick={props.prev.function.bind(this, props.prev.value)}
          >
            Prev
          </BlueButton>
          <Button onClick={props.close.function.bind(this, props.close.value)}>
            Finish
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Runtest;
