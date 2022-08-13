import classes from "./Details.module.css";
import Card from "../../../UI/Card/Card";
import ColHead from "./ColHead";

const Details = (props) => {
  return (
    <Card className={classes.background}>
      <ColHead className={classes.head} onClick={props.name}>
        Name
      </ColHead>
      <ColHead className={classes.head} onClick={props.status}>
        Status
      </ColHead>
      <ColHead className={classes.head} onClick={props.date}>
        Upload date
      </ColHead>
      <ColHead className={classes.head} onClick={props.total}>
        Total
      </ColHead>
      <ColHead className={classes.head} onClick={props.deliverable}>
        Deliverable
      </ColHead>
      <ColHead className={classes.head} onClick={props.risky}>
        Risky
      </ColHead>
      <ColHead className={classes.head} onClick={props.undeliverable}>
        Undeliverable
      </ColHead>
      <ColHead className={classes.head} onClick={props.unknown}>
        Unknown
      </ColHead>
      <ColHead className={classes.headlast} noArrow>
        Actions
      </ColHead>
    </Card>
  );
};

export default Details;