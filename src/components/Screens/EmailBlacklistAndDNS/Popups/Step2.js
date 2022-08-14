import { useState } from "react";
import classes from "./Step2.module.css";

import DelIcon from "../../../Icons/DelIcon";
import Modal from "../../../UI/Modal/Modal";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";
import Heading145 from "../../../UI/Heading/Heading";
import FileUploadSuccessful from "./FileUploadSuccessful";

let disabled = true;

const Runtest = (props) => {
  const [file, setFile] = useState("");
  const [fileData, setFileData] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);

  const uploadFileHandler = (event) => {
    const extn = event.target.files[0].name.split(".").pop();
    if (extn === "csv" || extn === "xlsx" || extn === "xls") {
      setFile(event.target.value);
      setFileData(event.target.files[0]);
      disabled = false;
    } else {
      setFile("");
      setFileData("");
      disabled = true;
      setError("Please choose correct file type");
    }
  };

  const saveHandler = () => {
    setloading(true);
    var formdata = new FormData();
    formdata.append("file", fileData);

    var requestOptions = {
      method: "POST",
      body: formdata,
      // headers: new Headers({
      //   Authorization: `Bearer ${authtoken}`,
      // }),
      redirect: "follow",
    };

    fetch(
      "https://intense-escarpment-67229.herokuapp.com/http://3.110.124.94:8000/validation/",
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          window.location.reload();
        }
        return response.text();
      })
      .then((result) => {
        setloading(false);
        if (JSON.parse(result).status === "success") {
          setSuccess(true);
          setTimeout(props.close.function.bind(this, props.close.value), 1500);
          setFile("");
          setFileData("");
          disabled = true;
        } else {
          setError("Opps! Something went wrong");
        }
      })
      .catch(() => {
        setloading(false);
        setError("Opps! Something went wrong");
      });
  };

  return (
    <>
      {success && <FileUploadSuccessful />}
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
                value={file}
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
                <div className={classes.input}>
                  {fileData && fileData !== ""
                    ? fileData.name
                    : "No files Selected"}
                </div>
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
          {loading ? (
            <div
              className={classes.flexcenter}
              style={{ width: "120px", margin: "0" }}
            >
              <div className="buttonLoading"></div>
            </div>
          ) : (
            <Button onClick={saveHandler} disabled={disabled}>
              Upload
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Runtest;
