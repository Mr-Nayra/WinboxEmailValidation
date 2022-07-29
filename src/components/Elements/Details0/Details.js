import classes from "./Details.module.css";
import Card from "../../UI/Card/Card";
import ColHead from "./ColHead";

const Details = () => {
  return (
    <Card className={classes.background}>
      <ColHead className={classes.head}>Name</ColHead>
      <ColHead className={classes.head}>Status</ColHead>
      <ColHead className={classes.head}>Upload date</ColHead>
      <ColHead className={classes.head}>Total</ColHead>
      <ColHead className={classes.head}>Deliverable</ColHead>
      <ColHead className={classes.head}>Risky</ColHead>
      <ColHead className={classes.head}>Undeliverable</ColHead>
      <ColHead className={classes.head}>Unknown</ColHead>
      <ColHead className={classes.headlast}>Actions</ColHead>
    </Card>
  );
};

export default Details;
