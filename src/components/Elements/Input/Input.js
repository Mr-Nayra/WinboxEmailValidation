import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <p className={classes.parah}>{props.children}</p>
        {props.required && <p className={classes.asterik}>*</p>}
      </div>
      <input
        className={`${props.className}  ${classes.input} `}
        placeholder={props.placeholder ? props.placeholder : props.children}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        readOnly={props.readOnly}
      />
    </div>
  );
};

export default Input;
