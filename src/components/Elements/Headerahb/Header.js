import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import ArrowIcon from "../../Icons/ArrowIcon";

const Header = (props) => {
  return (
    <Card className={classes.background}>
      <div className={classes.flex}>
        {props.to && (
          <Link className={classes.back} to={props.to}>
            <button className={classes.goBackButton}>
              <ArrowIcon rotate={classes.arrow} />
            </button>
          </Link>
        )}
        {!props.to && (
          <div className={classes.back}>
            <button className={classes.goBackButton} onClick={props.goBack}>
              <ArrowIcon rotate={classes.arrow} />
            </button>
          </div>
        )}
        <div className={classes.flexrow}>
          <p className={classes.parah}>{props.parah}</p>
          <p className={classes.parah}>
            {props.href && (
              <a href={props.href} className={classes.link} target="_blank">
                {props.linkName}
              </a>
            )}
          </p>
        </div>
      </div>
      {props.buttontext && (
        <div className={classes.btn}>
          <Button className={classes.btn} onClick={props.buttonOnClick}>
            {props.buttontext}
          </Button>
        </div>
      )}
      {props.date && <p className={classes.parah}>{props.date}</p>}
    </Card>
  );
};

export default Header;
