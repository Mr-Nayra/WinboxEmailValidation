import classes from "./Row.module.css";
import Card from "../../../UI/Card/Card";
import DeleteIcon from "../../../Icons/DeleteIcon";
import ChartIcon from "../../../Icons/ChartIcon";

const Row = (props) => {
  return (
    <Card className={classes.background}>
      <p className={classes.head}>{props.inbox}</p>
      <p className={classes.head}>{props.subject}</p>
      <p className={classes.head}>{props.score}</p>
      <p className={classes.head}>{props.created}</p>
      <p className={classes.head}>{props.status}</p>
      <div className={classes.head2}>
        {props.status === "Completed" && (
          <button
            className={classes.button}
            onClick={props.screenHandler.bind(this, props.inbox)}
          >
            <ChartIcon />
          </button>
        )}
        <button
          className={classes.button}
          onClick={props.rowDeleteHandler.bind(this, props.inbox)}
        >
          <DeleteIcon />
        </button>
      </div>
    </Card>
  );
};

export default Row;
