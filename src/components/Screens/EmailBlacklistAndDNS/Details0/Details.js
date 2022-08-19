import classes from "./Details.module.css";
import Card from "../../../UI/Card/Card";
import ColHead from "./ColHead";

const Details = (props) => {
  return (
    <Card className={classes.background}>
      <ColHead
        className={`${classes.head} ${classes.firstChild}`}
        onClick={props.name}
      >
        Name
      </ColHead>
      <ColHead className={`${classes.head} hide`} onClick={props.status}>
        Status
      </ColHead>
      <ColHead className={`${classes.head} hide`} onClick={props.date}>
        Upload date
      </ColHead>
      <ColHead className={classes.head} onClick={props.total}>
        Total
      </ColHead>

      <ColHead
        className={classes.head}
        onClick={props.unknown}
        style={{ flex: 2 }}
        noArrow
      >
        Progress
      </ColHead>
      <ColHead className={classes.headlast} noArrow>
        Actions
      </ColHead>
    </Card>
  );
};

export default Details;
