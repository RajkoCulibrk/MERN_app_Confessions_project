import React, { useState, useEffect } from "react";

import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  like,
  dislike,
  checkIfLiked,
  loadSubcomments,
} from "../actions/commentsActions";
import PostComment from "./PostComment";
import CommentFooter from "./CommentFooter";
import { setError } from "../actions/errorsActions";

const Comment = ({ comment, thisIsSubcomment }) => {
  const dispatch = useDispatch();
  const { user: userFromState, subCommentsList } = useSelector(
    (state) => state
  );

  const { userInfo } = userFromState;
  const { subcomments: subcommentsFromState } = subCommentsList;

  let { body, _id, likes, dislikes, author, comments } = comment;
  let commentsSubcomments = subcommentsFromState?.filter((subcomment) => {
    return subcomment.comment === _id;
  });
  let [liked, SetLiked] = useState(false);

  let [disliked, SetDisliked] = useState(false);
  let [likesDisplayed, setLikesDisplayed] = useState(likes);
  let [dislikesDisplayed, setDislikesDisplayed] = useState(dislikes);

  let [clicked, setClicked] = useState(false);
  let [showReplies, setShowReplies] = useState(false);
  const history = useHistory();
  let [replying, setRepying] = useState(false);
  const showReply = () => {
    setRepying(!replying);
  };
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
      dispatch(setError("You have to be logged in to perform that action. "));
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
      dispatch(setError("You have to be logged in to perform that action. "));
      history.push("/login");
    }
  };
  const showHideReplies = async () => {
    setClicked(true);

    if (!clicked) {
      await dispatch(loadSubcomments(_id));
    }

    setShowReplies(!showReplies);
  };

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
    <div
      className={`rounded shadow comment    text-light     mt-2 mb-1 ${
        thisIsSubcomment
          ? `  subcomment ml-auto ${
              showReplies &&
              commentsSubcomments.length > 0 &&
              "commentFullWidth p-0  mb-5 mt-5  "
            }`
          : `mb-5 `
      }`}
    >
      <div className="d-flex rounded justify-content-between p-2  confession__header">
        <span className="font-weight-bold font-italic text-uppercase">
          {author}
        </span>
        <span className="font-italic">
          <Moment format="DD/MM/YYYY HH:mm" date={comment.created_at} />
        </span>
      </div>
      <div className="confession__body  p-2 lead  mb-2">{body}</div>

      {
        <div className={` transition ${replying ? "x" : "y"}`}>
          {replying && (
            <PostComment setRepying={setRepying} subcomment={_id} id={_id} />
          )}
        </div>
      }
      {showReplies ? (
        <>
          <CommentFooter
            likeHandler={likeHandler}
            comments={comments}
            likesDisplayed={likesDisplayed}
            dislikesDisplayed={dislikesDisplayed}
            dislikeHandler={dislikeHandler}
            liked={liked}
            disliked={disliked}
            showReply={showReply}
            showReplies={showReplies}
            showHideReplies={showHideReplies}
            commentsSubcomments={commentsSubcomments}
          />
        </>
      ) : (
        ""
      )}

      <div className={`transition ${showReplies ? "pokazi " : "heightnula2"} `}>
        {commentsSubcomments?.map((comment) => {
          return (
            <div
              key={comment._id}
              className={`transition ${showReplies ? "pokazi " : "heightnula"}`}
            >
              {
                <Comment
                  key={comment._id}
                  thisIsSubcomment={true}
                  comment={comment}
                ></Comment>
              }
            </div>
          );
        })}
      </div>

      {!showReplies ? (
        <div>
          {/*  {replying && (
            <PostComment setRepying={setRepying} subcomment={_id} id={_id} />
          )} */}

          <CommentFooter
            likeHandler={likeHandler}
            comments={comments}
            likesDisplayed={likesDisplayed}
            dislikesDisplayed={dislikesDisplayed}
            dislikeHandler={dislikeHandler}
            liked={liked}
            disliked={disliked}
            showReply={showReply}
            showReplies={showReplies}
            showHideReplies={showHideReplies}
            commentsSubcomments={commentsSubcomments}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
