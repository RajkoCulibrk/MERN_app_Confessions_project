import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postComment } from "../actions/commentsActions";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostComment = ({ id, subcomment, setRepying }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const postCommentHandler = () => {
    setComment("");
    if (subcomment) {
      dispatch(postComment(id, comment, subcomment));
      setRepying(false);
    } else {
      dispatch(postComment(id, comment));
    }
  };
  return (
    <div className=" d-flex p-2">
      <InputGroup>
        <FormControl
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          as="textarea"
          aria-label="With textarea"
        ></FormControl>
      </InputGroup>
      <div className="p-2">
        <Button onClick={postCommentHandler} variant="warning">
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};

export default PostComment;
