import { useState } from "react";
import classes from "./Step2.module.css";

import DelIcon from "../../../Icons/DelIcon";
import Modal from "../../../UI/Modal/Modal";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";
import Heading145 from "../../../UI/Heading/Heading";

const Runtest = (props) => {
  const [file, setFile] = useState("No file selected");
  const [error, setError] = useState("");

  const uploadFileHandler = (event) => {
    const extn = event.target.files[0].name.split(".").pop;
    if (extn === "xls" || extn === "xls" || extn === "xls") {
      setFile(event.target.files[0].name);
    } else {
      setError(" please choose correct file type");
    }
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
            <div>
              <p className={classes.parah}>Upload a file</p>
            </div>
            <div>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={uploadFileHandler}
              />
              <label
                htmlFor="file"
                style={{
                  display: "flex",
                  marginBottom: "1vh",
                  alignItems: "center",
                }}
              >
                <div className={classes.input}>{file}</div>
                <div className={classes.button}>Select File</div>
              </label>
              <p
                className={classes.error}
                style={{ visibility: error ? "visible" : "hidden" }}
              >
                {error || "hi"}
              </p>
              <Heading145>Note: xls,xlsx and csv file supported</Heading145>
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
            Upload
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Runtest;
