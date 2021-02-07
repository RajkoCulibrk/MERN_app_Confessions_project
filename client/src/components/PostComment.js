import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../actions/commentsActions";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setError } from "../actions/errorsActions";
import { useHistory } from "react-router-dom";

const PostComment = ({ id, subcomment, setRepying }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // the body of the comment that the user types in
  const [comment, setComment] = useState("");
  const {
    user: { userInfo },
  } = useSelector((state) => state);

  // sets the body of the comment back to "" , if the user is not logged in redirects him to loggin page and sipatches setError action. If this component is rendered within a confession component the postComment action will not receive a subcomment parameter which will be then set to false in the action so the functionality for perssisting a comment of a confession is triggered otherwise the functionality for persisting a comment of a comment to the database will be trigered.
  const postCommentHandler = () => {
    setComment("");
    if (!userInfo) {
      dispatch(setError("You have to be logged in to perform that action. "));
      history.push("/login");
    }
    if (subcomment) {
      dispatch(postComment(id, comment, subcomment));
      setRepying(false);
    } else {
      dispatch(postComment(id, comment));
    }
  };
  return (
    <div className=" d-flex p-2 ">
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
