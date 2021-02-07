import React, { useState } from "react";
import { Button, Modal, FormControl } from "react-bootstrap";
import { postConfession } from "../actions/confessionsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setError } from "../actions/errorsActions";
import {} from "@fortawesome/react-fontawesome";
const PostConfession = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [confession, setConfession] = useState("");

  const handleClose = () => setShow(false);
  const {
    user: { userInfo },
  } = useSelector((state) => state);
  const handleShow = () => {
    if (!userInfo) {
      dispatch(setError("Please sign in in order to confess."));

      history.push("/login");
    }
    setShow(true);
  };
  const handlePost = () => {
    dispatch(postConfession(confession));
    setConfession("");
    setShow(false);
  };

  return (
    <>
      <Button className=" rounded-circle  add-confession" onClick={handleShow}>
        <FontAwesomeIcon icon={faPenFancy} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className="background-main border-none text-light"
          closeButton
        >
          <Modal.Title>What lies on your chest?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-main border-none">
          <FormControl
            onChange={(e) => setConfession(e.target.value)}
            as="textarea"
            value={confession}
            aria-label="With textarea"
          />
        </Modal.Body>
        <Modal.Footer className="background-main border-none">
          <Button
            className="confession_button"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="confession_button"
            variant="primary"
            onClick={handlePost}
          >
            Confess
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostConfession;
