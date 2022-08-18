import React, { useLayoutEffect, useState } from "react";
import classes from "./Mainbar.module.css";

import Hero from "../../../Elements/Hero/Hero";
import Loader from "../../../Elements/Loader/Loader";
import Details from "../Details0/Details";
import Step2 from "../Popups/Step2";
import Row from "../Row/Row";
import Step1 from "../Popups/Step1";
import Card from "../../../UI/Card/Card";
import Heading145 from "../../../UI/Heading/Heading";

var software;
var request = new XMLHttpRequest();

const MainBar = () => {
  // const history = useHistory();

  const [showPopUp, setShowPopUp] = useState("0");
  const [rerender, setRerender] = useState(0);
  const [loading, setLoading] = useState(true);
  const [da, setDa] = useState([]);

  const rerenderer = () => {
    setRerender((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    setLoading(true);
    request.open("GET", "https://validation.getwinbox.co/validation/");

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const d = JSON.parse(this.responseText).validation_lists;
        if (d.length === 0) {
          setLoading(false);
        }
        setDa(d);
        for (let i = 0; i < d.length; i++) {
          const task_id = d[i].task_id;
          var request2 = new XMLHttpRequest();
          request2.open(
            "GET",
            "https://validation.getwinbox.co/validation/get_progress/" + task_id
          );

          request2.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              const text = JSON.parse(this.responseText);
              if (text.state === "SUCCESS") {
                setDa((prev) =>
                  prev.map((item) =>
                    item.task_id === task_id
                      ? {
                          ...item,
                          status: "Completed",
                          a: {
                            current: d[i].total_emails,
                            total: d[i].total_emails,
                          },
                        }
                      : item
                  )
                );
              } else if (text.state === "PROGRESS") {
                setDa((prev) =>
                  prev.map((item) =>
                    item.task_id === task_id
                      ? {
                          ...item,
                          status: "Running",
                          a: {
                            current: text.details.current,
                            total: text.details.total,
                          },
                          total_emails: text.details.total,
                        }
                      : item
                  )
                );
                let socket = new WebSocket(
                  "wss://validation.getwinbox.co:8000/task/progress/" + task_id
                );
                socket.onmessage = (event) => {
                  const s = JSON.parse(event.data);
                  if (s.state === "PROGRESS") {
                    setDa((prev) =>
                      prev.map((item) =>
                        item.task_id === task_id
                          ? {
                              ...item,
                              a: {
                                current: s.meta.current,
                                total: s.meta.total,
                              },
                            }
                          : item
                      )
                    );
                  } else if (s.state === "COMPLETED") {
                    setDa((prev) =>
                      prev.map((item) =>
                        item.task_id === task_id
                          ? {
                              ...item,
                              total_emails: s.meta.total_emails,
                              total_deliverable: s.meta.total_deliverable,
                              total_risky: s.meta.total_risky,
                              total_undeliverable: s.meta.total_undeliverable,
                              total_unknown: s.meta.total_unknown,
                            }
                          : item
                      )
                    );
                    socket.close();
                  }
                };

                socket.onclose = (event) => {
                  d[i].status = "Completed";
                  setDa((prev) =>
                    prev.map((item) =>
                      item.task_id === task_id
                        ? { ...item, status: "Completed" }
                        : item
                    )
                  );
                };
              }
              if (i === d.length - 1) {
                setLoading(false);
              }
            }
          };
          request2.send();
        }
      } else if (this.status === 401) {
        window.location.reload();
      } else if (this.status === 500) {
        // history.replace("/error-500");
      }
    };
    request.send();
  }, [rerender]);

  const renderPopUp = (value, s) => {
    if (s) {
      software = s;
    }
    setShowPopUp(value);
  };

  const nameFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.display_name > b.display_name
        ? 1
        : b.display_name > a.display_name
        ? -1
        : 0
    );
    if (ass) {
      if (ass) {
        setDa(a);
      } else {
        setDa(a.reverse());
      }
    } else {
      setDa(a.reverse());
    }
    setLoading(false);
  };

  const statusFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) => (a.status > b.status ? 1 : b.status > a.status ? -1 : 0));
    if (ass) {
      if (ass) {
        setDa(a);
      } else {
        setDa(a.reverse());
      }
    } else {
      setDa(a.reverse());
    }
    setLoading(false);
  };

  const dateFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.created > b.created ? 1 : b.created > a.created ? -1 : 0
    );
    if (ass) {
      if (ass) {
        setDa(a);
      } else {
        setDa(a.reverse());
      }
    } else {
      setDa(a.reverse());
    }
    setLoading(false);
  };

  const totalFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.total_emails > b.total_emails
        ? 1
        : b.total_emails > a.total_emails
        ? -1
        : 0
    );
    if (ass) {
      if (ass) {
        setDa(a);
      } else {
        setDa(a.reverse());
      }
    } else {
      setDa(a.reverse());
    }
    setLoading(false);
  };

  const deleteData = (filename) => {
    setDa((prev) =>
      prev.filter(function (row) {
        return row.file_name !== filename;
      })
    );
  };

  return (
    <>
      {showPopUp === "1" && (
        <Step1
          close={{ function: renderPopUp, value: "0" }}
          next={{ function: renderPopUp, value: "2" }}
        />
      )}
      {showPopUp === "2" && (
        <Step2
          software={software}
          rerenderer={rerenderer}
          close={{ function: renderPopUp, value: "0" }}
          prev={{ function: renderPopUp, value: "1" }}
          next={{ function: renderPopUp, value: "0" }}
        />
      )}

      <Hero
        heading="Email Validation"
        buttontext="Import Data"
        onClick={renderPopUp.bind(this, "1")}
        value="1"
      />
      <Details
        name={nameFunc}
        status={statusFunc}
        date={dateFunc}
        total={totalFunc}
      />

      {loading ? (
        <Loader />
      ) : da.length !== 0 ? (
        da.map((rowdetail) => (
          <Row
            key={rowdetail.created}
            display_name={rowdetail.display_name}
            file_name={rowdetail.file_name}
            created={rowdetail.created.slice(0, 10)}
            status={rowdetail.status}
            progress={
              rowdetail.a
                ? rowdetail.a
                : {
                    current: rowdetail.total_emails,
                    total: rowdetail.total_emails,
                  }
            }
            deliverable={rowdetail.total_deliverable}
            undeliverable={rowdetail.total_undeliverable}
            total={rowdetail.total_emails}
            risky={rowdetail.total_risky}
            unknown={rowdetail.total_unknown}
            deleteData={deleteData}
          />
        ))
      ) : (
        <Card className={classes.container}>
          <Heading145>No data to display</Heading145>
        </Card>
      )}
    </>
  );
};

export default MainBar;
