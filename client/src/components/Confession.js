import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { like, dislike, checkIfLiked } from "../actions/confessionsActions";
import { useHistory, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Moment from "react-moment";
import PostComment from "./PostComment";
import { setError } from "../actions/errorsActions";

const Confession = ({ confession, singleScreen }) => {
  const dispatch = useDispatch();
  let { body, _id, likes, dislikes, author, created_at, comments } = confession;

  const { user } = useSelector((state) => state);
  const { userInfo } = user;
  let [likesDisplayed, setLikesDisplayed] = useState(likes);
  let [dislikesDisplayed, setDislikesDisplayed] = useState(dislikes);
  let [liked, SetLiked] = useState(false);
  let [disliked, SetDisliked] = useState(false);
  /// if repling is true displays the post comment component
  let [replying, setRepying] = useState(false);
  let history = useHistory();

  const showReply = () => {
    setRepying(!replying);
  };

  // if user is not logged in redirects the user to login. Else increments the number of likes displayed , adn dispatches the like action to for the like data to be persisted to the server. If the confession is disliked removes the r ed color from the dislike button and dicrements dislikes displayed.
  const likeHandler = () => {
    if (userInfo) {
      like(_id);
      if (liked) {
        setLikesDisplayed(likesDisplayed - 1);
      } else {
        setLikesDisplayed(likesDisplayed + 1);
        if (disliked) {
          setDislikesDisplayed(dislikesDisplayed - 1);
          SetDisliked(!disliked);
        }
      }
      SetLiked(!liked);
    } else {
      dispatch(setError("You have to be logged in to perform that action."));

      history.push("/login");
    }
  };
  // the same as likeHandler but for dislikes
  const dislikeHandler = () => {
    if (userInfo) {
      dislike(_id);
      if (disliked) {
        setDislikesDisplayed(dislikesDisplayed - 1);
      } else {
        setDislikesDisplayed(dislikesDisplayed + 1);
        if (liked) {
          setLikesDisplayed(likesDisplayed - 1);
          SetLiked(!liked);
        }
      }
      SetDisliked(!disliked);
    } else {
      dispatch(setError("You have to be logged in to perform that action."));
      history.push("/login");
    }
  };

  // dispatches the checkLikeDislike action when the component is loaded and the user is logged in so the liked disliked variables  can be set to true or false and the colors of the buttons changed accordinly. UseEffect cleanup is used so the fetching only happens when the component is mounted and when it is unmounted we do not update its state because it is dismoundet and we do not get error that the component has dismounted but we are trying to update its state.

  useEffect(() => {
    let isMounted = true;
    const checkLikeDislike = async (_id) => {
      let likeDislike = await checkIfLiked(_id);
      if (isMounted) {
        SetLiked(likeDislike?.liked);
        SetDisliked(likeDislike?.disliked);
      }
    };
    if (userInfo && isMounted) {
      checkLikeDislike(_id);
    }
    return () => {
      isMounted = false;
    };
  }, [_id, userInfo]);

  return (
    <div className="confession  rounded  text-light   ml-auto mr-auto mb-5">
      <div className="d-flex justify-content-between rounded p-2 confession__header ">
        <span className="font-weight-bold font-italic text-uppercase ">
          {author}
        </span>
        <span className="font-italic">
          <Moment format="DD/MM/YYYY HH:mm" date={created_at} />
        </span>
      </div>
      <div className="confession__body lead p-2 text-break  mb-2">{body}</div>
      <div className={`mb-4 transition ${replying ? "x" : "y"}`}>
        {replying && <PostComment id={_id} />}
      </div>
      <div className="confession__footer p-2 d-flex justify-content-between">
        <div onClick={likeHandler} className="confession__footer__item">
          <Button className="confession_button" size="sm">
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
          {singleScreen ? (
            <Button
              className={`confession_button `}
              onClick={showReply}
              variant={"secondary"}
              size="sm"
            >
              <FontAwesomeIcon icon={faComment} />
              {" " + comments}
            </Button>
          ) : (
            <Link to={`/confession/${_id}`}>
              <Button
                className={`confession_button`}
                variant={"secondary"}
                size="sm"
              >
                <FontAwesomeIcon icon={faComment} /> {" " + comments}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confession;
