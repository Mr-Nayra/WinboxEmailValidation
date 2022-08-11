import React, { useState } from "react";

import classes from "./Mainbar.module.css";
import Hero from "../../../Elements/Hero/Hero";
import Details from "../../../Elements/Details0/Details";
import Step2 from "../Popups/Step2";
import Row from "../Row/Row";
import Step1 from "../Popups/Step1";
import DownloadResults from "../Popups/DownloadResults";

var software;

const MainBar = () => {
  const [showPopUp, setShowPopUp] = useState("0");

  const renderPopUp = (value, s) => {
    if (s) {
      software = s;
    }
    setShowPopUp(value);
  };

  return (
    <>
      <DownloadResults close={{ function: renderPopUp, value: "0" }} />
      {showPopUp === "1" && (
        <Step1
          close={{ function: renderPopUp, value: "0" }}
          next={{ function: renderPopUp, value: "2" }}
        />
      )}
      {showPopUp === "2" && (
        <Step2
          software={software}
          close={{ function: renderPopUp, value: "0" }}
          prev={{ function: renderPopUp, value: "1" }}
          next={{ function: renderPopUp, value: "3" }}
        />
      )}

      <Hero
        heading="Email Validation"
        buttontext="Import Data"
        onClick={renderPopUp.bind(this, "1")}
        value="1"
      />
      <Details />
    </>
  );
};

export default MainBar;
