import React, { useState } from "react";
import { Button, Modal, FormControl } from "react-bootstrap";
import { postConfession } from "../actions/confessionsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <Modal.Header closeButton>
          <Modal.Title>What lies on your chest?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            onChange={(e) => setConfession(e.target.value)}
            as="textarea"
            value={confession}
            aria-label="With textarea"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePost}>
            Confess
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostConfession;
