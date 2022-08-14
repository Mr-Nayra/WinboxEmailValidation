import React, { useState } from "react";

import Heading145, { Heading186 } from "../../../UI/Heading/Heading";
import Modal from "../../../UI/Modal/Modal";
import DelIcon from "../../../Icons/DelIcon";
import Button from "../../../UI/Button/Button";
import BlueButton from "../../../UI/BlueButton/Button";
import classes from "./DownloadResults.module.css";
import Radio from "../Elements/Radio";
import DownloadOptions from "../Elements/DownloadOptions";

const DownloadResults = (props) => {
  const [loading, setLoading] = useState(false);
  const [deliverable, setDeliverable] = useState(false);
  const [risky, setRisky] = useState(false);
  const [undeliverable, setUndeliverable] = useState(false);
  const [unknown, setUnknown] = useState(false);
  const [downloadEverything, setDownloadEverything] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(1);

  console.log(selectedFormat);

  const downloadEverythingHandler = () => {
    setDownloadEverything((prev) => {
      if (!prev) {
        props.deliverable && setDeliverable(true);
        props.risky && setRisky(true);
        props.undeliverable && setUndeliverable(true);
        props.unknown && setUnknown(true);
      }
      return !prev;
    });
  };

  const submitHandler = () => {
    const a = [];
    deliverable && a.push("Deliverable");
    undeliverable && a.push("Risky");
    unknown && a.push("Undeliverable");
    risky && a.push("Unknown");

    setLoading(true);
    var formdata = new FormData();
    formdata.append("file_name", props.file_name);
    formdata.append("display_name", props.display_name);
    formdata.append("download_categories", a);
    formdata.append(
      "file_format",
      selectedFormat === 1 ? "csv" : selectedFormat === 2 ? "xlsx" : "xls"
    );

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(
      "https://intense-escarpment-67229.herokuapp.com/http://3.110.124.94:8000/validation/download_file/",
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          window.location.reload();
        }
        return response.blob();
      })
      .then((data) => {
        setLoading(false);
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download =
          props.file_name.split(".")[0] +
          "." +
          (selectedFormat === 1
            ? "csv"
            : selectedFormat === 2
            ? "xlsx"
            : "xls");
        a.click();
        // if (JSON.parse(result).status === "success") {
        // } else {
        //   // history.replace("/error-500");
        // }
      });
  };

  return (
    <Modal onClick={props.close.function} value={props.close.value}>
      <div className={classes.flexspace} style={{ marginBottom: "1vh" }}>
        <Heading186>Download Results</Heading186>
        <DelIcon onClick={props.close.function} value={props.close.value} />
      </div>
      <Heading145>
        Choose which results you wish to download and adjust your preferences
      </Heading145>
      <DownloadOptions
        options={[
          props.deliverable,
          props.risky,
          props.undeliverable,
          props.unknown,
        ]}
        deliverable={deliverable}
        risky={risky}
        undeliverable={undeliverable}
        unknown={unknown}
        downloadEverything={downloadEverything}
        setDeliverable={setDeliverable}
        setUndeliverable={setUndeliverable}
        setRisky={setRisky}
        setUnknown={setUnknown}
        setDownloadEverything={setDownloadEverything}
        downloadEverythingHandler={downloadEverythingHandler}
      />
      <Heading145 style={{ fontWeight: 600, marginTop: "1vh" }}>
        File Format
      </Heading145>
      <Radio
        setSelectedFormat={setSelectedFormat}
        selectedFormat={selectedFormat}
      />
      <Heading145>
        Items selected :- ({" "}
        {(
          (deliverable ? props.deliverable : 0) +
          (risky ? props.risky : 0) +
          (undeliverable ? props.undeliverable : 0) +
          (unknown ? props.unknown : 0)
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        items )
      </Heading145>
      <div className={classes.flexspace} style={{ marginTop: "3vh" }}>
        <BlueButton onClick={props.close.function} value={props.close.value}>
          Close
        </BlueButton>
        {loading ? (
          <div
            className={classes.flexcenter}
            style={{ width: "120px", margin: "0" }}
          >
            <div className="buttonLoading"></div>
          </div>
        ) : (
          <Button onClick={submitHandler}>Download</Button>
        )}
      </div>
    </Modal>
  );
};

export default DownloadResults;
