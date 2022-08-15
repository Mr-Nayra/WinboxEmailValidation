import React, { useLayoutEffect, useState } from "react";

import Hero from "../../../Elements/Hero/Hero";
import Loader from "../../../Elements/Loader/Loader";
import Details from "../Details0/Details";
import Step2 from "../Popups/Step2";
import Row from "../Row/Row";
import Step1 from "../Popups/Step1";

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
    request.open(
      "GET",
      "https://intense-escarpment-67229.herokuapp.com/http://3.110.124.94:8000/validation/"
    );

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const d = JSON.parse(this.responseText).validation_lists;
        for (let i = 0; i < d.length; i++) {
          const task_id = d[i].task_id;
          var request2 = new XMLHttpRequest();
          request2.open(
            "GET",
            "https://intense-escarpment-67229.herokuapp.com/http://3.110.124.94:8000/validation/get_progress/" +
              task_id
          );

          request2.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              const text = JSON.parse(this.responseText);
              if (text.state === "SUCCESS") {
                d[i].status = "Completed";
                d[i].a = 100;
              } else if (text.state === "PROGRESS") {
                d[i].status = "Running";
                d[i].a = (text.details.current / text.details.total) * 100;
                d[i].total_emails = text.details.total;
                let socket = new WebSocket(
                  "ws://3.110.124.94:8000/task/progress/" + task_id
                );
                socket.onmessage = (event) => {
                  const s = JSON.parse(event.data);
                  setDa((prev) =>
                    prev.map((item) =>
                      item.task_id === task_id
                        ? { ...item, a: (s.meta.current / s.meta.total) * 100 }
                        : item
                    )
                  );
                  if (s.meta.current === s.meta.total) {
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
                setDa(d);
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

  const deliverableFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.total_deliverable > b.total_deliverable
        ? 1
        : b.total_deliverable > a.total_deliverable
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

  const riskyFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.total_risky > b.total_risky ? 1 : b.total_risky > a.total_risky ? -1 : 0
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

  const undeliverableFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.total_undeliverable > b.total_undeliverable
        ? 1
        : b.total_undeliverable > a.total_undeliverable
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

  const unknownFunc = (ass) => {
    setLoading(true);
    const a = [...da];
    a.sort((a, b) =>
      a.total_unknown > b.total_unknown
        ? 1
        : b.total_unknown > a.total_unknown
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
        deliverable={deliverableFunc}
        risky={riskyFunc}
        undeliverable={undeliverableFunc}
        unknown={unknownFunc}
      />

      {loading ? (
        <Loader />
      ) : (
        da &&
        da.map((rowdetail) => (
          <Row
            key={rowdetail.created}
            display_name={rowdetail.display_name}
            file_name={rowdetail.file_name}
            created={rowdetail.created.slice(0, 10)}
            status={rowdetail.status}
            progress={rowdetail.a}
            deliverable={rowdetail.deliverable}
            undeliverable={rowdetail.total_undeliverable}
            total={rowdetail.total_emails}
            risky={rowdetail.total_risky}
            unknown={rowdetail.total_unknown}
            deleteData={deleteData}
          />
        ))
      )}
    </>
  );
};

export default MainBar;
