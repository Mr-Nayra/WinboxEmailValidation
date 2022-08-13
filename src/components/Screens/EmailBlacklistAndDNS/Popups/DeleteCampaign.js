import PopUphp2b from "../../../Elements/PopUp/PopUphp2b";

const DeleteCampaign = (props) => {
  return (
    <PopUphp2b
      heading={"Delete file " + props.name + "?"}
      parah="Do you really want to delete this file?"
      close={{ function: props.close.function, value: props.close.value }}
      next={props.delete}
    />
  );
};

export default DeleteCampaign;
