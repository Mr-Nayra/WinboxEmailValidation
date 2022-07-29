import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./Header.module.css";
import Card from "../../UI/Card/Card";
import Logo from "../../Icons/Logo";
import NotifIcon from "./NotifIcon";
import url from "../../../util/url";
import LogoutPopUp from "./LogoutPopUp";
import { SetDetails } from "../../../store/Auth";

const Header = () => {
  const history = useHistory();
  const [logoutPopUphandler, setLogoutPophandler] = React.useState("0");
  const authtoken = useSelector((state) => state.Authentication.accessToken);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.Authentication.name);
  const email = useSelector((state) => state.Authentication.email);
  const image = useSelector((state) => state.Authentication.profilePic);

  const handleLogoutPopUp = (event) => {
    setLogoutPophandler(event.currentTarget.value);
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  React.useEffect(() => {
    var request = new XMLHttpRequest();

    request.open("GET", url + "auth/user_profile/");

    request.setRequestHeader("Content-Type", "application/json");

    request.setRequestHeader("Authorization", `Bearer ${authtoken}`);

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const message = JSON.parse(this.responseText);
        dispatch(SetDetails(message));
      } else if (this.status === 401) {
        window.location.reload();
      } else if (this.status === 500) {
        history.replace("/error-500");
      }
    };

    request.send();

    var request2 = new XMLHttpRequest();

    request2.open(
      "GET",
      "https://private-9933d8-winbox.apiary-mock.com/notifications"
    );

    request2.onreadystatechange = function () {
      if (this.readyState === 4) {
        // console.log("Status:", this.status);
        // console.log("Headers:", this.getAllResponseHeaders());
        // console.log("Body:", this.responseText);
      }
    };

    request2.send();
  }, []);

  return (
    <>
      {logoutPopUphandler === "1" && (
        <LogoutPopUp
          email={email}
          close={{ function: handleLogoutPopUp, value: "0" }}
          next={logout}
        />
      )}
      <Card className={classes.background}>
        <div className={classes.flex}>
          <Logo />
        </div>
        <div className={classes.flex}>
          <NotifIcon className={classes.icon} />
          <div className={`${classes.container} ${classes.flex}`}>
            <h3 className={classes.name}>{name}</h3>
            <button
              className={classes.button}
              onClick={handleLogoutPopUp}
              value="1"
            >
              {image && image.includes(".com") ? (
                <img src={image} className={classes.userImg} alt="user image" />
              ) : (
                <img
                  src={require("../../Icons/profile.png")}
                  className={classes.userImg}
                  alt="user image"
                />
              )}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Header;
