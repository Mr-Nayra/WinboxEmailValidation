import { useState } from "react";
import classes from "./Row.module.css";

import Card from "../../../UI/Card/Card";
import DeleteIcon from "../../../Icons/DeleteIcon";
import DeleteCampaign from "../Popups/DeleteCampaign";
import DownloadIcon from "../Images/DownloadIcon";
import DownloadResults from "../Popups/DownloadResults";

const Row = (props) => {
  const [showPopUp, setShowPopUp] = useState("0");

  const deleteRow = (filename) => {
    console.log(filename);
    props.deleteData(filename);
    setShowPopUp("0");

    var formdata = new FormData();
    formdata.append("file_name", filename);
    var requestOptions = {
      method: "DELETE",
      body: formdata,
      //   headers: new Headers({
      //     Authorization: `Bearer ${authtoken}`,
      //   }),
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
        if (JSON.parse(result).status === "success") {
        } else {
          // history.replace("/error-500");
        }
      });
  };

  const PopUpHandler = (event) => {
    setShowPopUp(event.currentTarget.value);
  };

  return (
    <>
      {showPopUp === "1" && (
        <DeleteCampaign
          close={{ function: PopUpHandler, value: "0" }}
          delete={deleteRow.bind(this, props.file_name)}
          name={props.display_name}
        />
      )}

      {showPopUp === "2" && (
        <DownloadResults
          close={{ function: PopUpHandler, value: "0" }}
          deliverable={!!props.deliverable}
          risky={!!props.risky}
          undeliverable={!!props.undeliverable}
          unknown={!!props.unknown}
          file_name={props.file_name}
          display_name={props.display_name}
        />
      )}

      <Card className={classes.background}>
        <p className={classes.head}>{props.display_name}</p>
        <p className={classes.head}>{props.status}</p>
        <p className={classes.head}>{props.created}</p>
        <p className={classes.head}>{props.total}</p>
        <p className={classes.head}>{props.deliverable}</p>
        <p className={classes.head}>{props.risky}</p>
        <p className={classes.head}>{props.undeliverable}</p>
        <p className={classes.head}>{props.unknown}</p>
        <div className={classes.head2}>
          {props.status === "Completed" && (
            <button className={classes.button} onClick={PopUpHandler} value="2">
              <DownloadIcon />
            </button>
          )}
          <button className={classes.button} onClick={PopUpHandler} value="1">
            <DeleteIcon />
          </button>
        </div>
      </Card>
    </>
  );
};

export default Row;
