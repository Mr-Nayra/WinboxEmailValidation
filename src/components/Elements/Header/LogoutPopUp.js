import PopUphp2b from "../PopUp/PopUphp2b";

const LogoutPopUp = (props) => {
  return (
    <PopUphp2b
      heading={"Logout from " + props.email + "?"}
      parah="Do you really want logout from the system?"
      close={{ function: props.close.function, value: props.close.value }}
      next={props.next}
    />
  );
};

export default LogoutPopUp;
