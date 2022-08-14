import classes from "./FileUploadSuccessful.module.css";
import Modal from "../../../UI/Modal/Modal";
import { Heading186 } from "../../../UI/Heading/Heading";

const FileUploadSuccessful = (props) => {
  return (
    <Modal modalClass={classes.modal} backdropClass={classes.backdropClass}>
      <Heading186 className={classes.heading}>
        File upload successful
      </Heading186>
    </Modal>
  );
};

export default FileUploadSuccessful;
