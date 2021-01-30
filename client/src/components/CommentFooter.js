import React from "react";

import { Button } from "react-bootstrap";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentFooter = ({
  likeHandler,
  likesDisplayed,
  dislikesDisplayed,
  dislikeHandler,
  liked,
  disliked,
  showReply,
  showReplies,
  showHideReplies,
  commentsSubcomments,
  comments,
}) => {
  return (
    <div className="confession__footer  p-2 mt-3 mb-3  d-flex justify-content-between">
      <div onClick={likeHandler} className="confession_footer__item">
        <Button className={`confession_button `} size="sm">
          <FontAwesomeIcon
            className={` white ${liked && "liked"}`}
            icon={faThumbsUp}
          />{" "}
          {likesDisplayed}
        </Button>
      </div>
      <div onClick={dislikeHandler} className="confession_footer__item">
        <Button className={`confession_button `} size="sm">
          <FontAwesomeIcon
            className={` white ${disliked && "disliked"}`}
            icon={faThumbsDown}
          />{" "}
          {dislikesDisplayed}
        </Button>
      </div>
      <div className="confession_footer__item">
        {" "}
        <Button className={`confession_button `} onClick={showReply} size="sm">
          <FontAwesomeIcon icon={faReply} />
        </Button>
      </div>
      <div className="confession_footer__item">
        {" "}
        <Button
          size="sm"
          className={
            showReplies && commentsSubcomments.length > 0
              ? "bg-warning"
              : "confession_button"
          }
          onClick={showHideReplies}
        >
          <FontAwesomeIcon icon={faComment} /> {comments}
        </Button>
      </div>
    </div>
  );
};

export default CommentFooter;
