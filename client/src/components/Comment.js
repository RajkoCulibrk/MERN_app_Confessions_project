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
  let { body, _id, likes, dislikes, author, comments } = comment;
  const dispatch = useDispatch();
  const history = useHistory();

  const { user: userFromState, subCommentsList } = useSelector(
    (state) => state
  );
  const { userInfo } = userFromState;
  const { subcomments: subcommentsFromState } = subCommentsList;

  // filters the comments of this comment from the redux store so only its subcomments are displayed
  let commentsSubcomments = subcommentsFromState?.filter((subcomment) => {
    return subcomment.comment === _id;
  });

  //like dislike state functionality
  let [liked, SetLiked] = useState(false);
  let [disliked, SetDisliked] = useState(false);
  let [likesDisplayed, setLikesDisplayed] = useState(likes);
  let [dislikesDisplayed, setDislikesDisplayed] = useState(dislikes);

  //if showReplies is true the cubcomments of a comment will be displayed
  let [showReplies, setShowReplies] = useState(false);

  // if replaying is true the post comment component will be displayed
  let [replying, setRepying] = useState(false);

  const showReply = () => {
    setRepying(!replying);
  };

  // if user is not logged in redirects the user to login. Else increments the number of likes displayed , adn dispatches the like action to for the like data to be persisted to the server. If the comment is disliked removes the r ed color from the dislike button and dicrements dislikes displayed.
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

  //the same as like handler but for dislikes
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

  // used in the showHideReplies function so the loading of the subcomments happens only once
  let [clicked, setClicked] = useState(false);

  // sets the clicked variable to true so that in the future when clicked again the fetching of the data (loading subcomments) happens only once because it happens only when the clicked variable is set to false
  const showHideReplies = async () => {
    setClicked(true);

    if (!clicked) {
      await dispatch(loadSubcomments(_id));
    }

    setShowReplies(!showReplies);
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
    // classnames regulating the look of the comment or the subcoment. If the component is being displayed as a comment its width is set to 100%, but if the component is set to be a subcomment (the thisIsSubcomment is set to true ) the width is 90%  and margin left set to auto so it is pushed to the side. If the showReplies and commentsSubcomments.length > 0 are true the subcomment width will grow to 100% . Thre is also some stuff happening with margins if the we are handling with subcomment or a comment
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
        // if replying is true the post comment component will render. And the height of the component set to 0px or 50px
        <div className={` transition ${replying ? "x" : "y"}`}>
          {replying && (
            <PostComment setRepying={setRepying} subcomment={_id} id={_id} />
          )}
        </div>
      }
      {showReplies ? (
        // if show replies is true the comment footer will be displayed here
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
          /// for each subcomment of a comment new comment component will be rendered here and the param thisIsSubcomment will be set to true so the width of a subcomment is set to 90% and subcomment functionality enabled. If show replies is true this subcomment container will render otherwise it will be removed.

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
        // if show replies is false the comment footer will be displayed here
        <div>
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
