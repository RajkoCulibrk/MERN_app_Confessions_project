import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { like, dislike, checkIfLiked } from "../actions/confessionsActions";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Confession = ({ confession }) => {
  let { body, _id, likes, dislikes, author } = confession;
  const { user } = useSelector((state) => state);
  const { userInfo } = user;
  let [likesDisplayed, setLikesDisplayed] = useState(likes);
  let [dislikesDisplayed, setDislikesDisplayed] = useState(dislikes);
  let [liked, SetLiked] = useState(false);
  let [disliked, SetDisliked] = useState(false);
  let history = useHistory();
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
      history.push("/login");
    }
  };

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
      history.push("/login");
    }
  };
  const checkLikeDislike = async () => {
    let likeDislike = await checkIfLiked(_id);
    SetLiked(likeDislike.liked);
    SetDisliked(likeDislike.disliked);
  };
  useEffect(() => {
    if (userInfo) {
      checkLikeDislike();
    }
  }, []);

  return (
    <div className="confession w-50 bg-dark text-light p-2  ml-auto mr-auto mb-5">
      <div className="d-flex justify-content-between p-2 ">
        <span>{author}</span>
        <span>18 Jan 21</span>
      </div>
      <div className="confession__body  mb-2">{body}</div>
      <div className="confession__footer d-flex justify-content-between">
        <div onClick={likeHandler} className="confession_footer__item">
          <Button variant={liked ? "success" : "secondary"}>
            Approve {likesDisplayed}
          </Button>
        </div>
        <div onClick={dislikeHandler} className="confession_footer__item">
          <Button variant={disliked ? "danger" : "secondary"}>
            Disaprove {dislikesDisplayed}
          </Button>
        </div>
        <div className="confession_footer__item">
          {" "}
          <Button variant={"secondary"}>Comments</Button>
        </div>
      </div>
    </div>
  );
};

export default Confession;
