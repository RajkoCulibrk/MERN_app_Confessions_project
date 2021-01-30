import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadSingleConfession } from "../actions/confessionsActions";
import Confession from "../components/Confession";
import { useDispatch, useSelector } from "react-redux";
import { loadComments } from "../actions/commentsActions";
import Comment from "../components/Comment";
import SpinnerComonent from "../components/Spinner";

const SingleConfession = () => {
  const dispatch = useDispatch();

  const { singleConfession, commentsList } = useSelector((state) => state);
  let { comments } = commentsList;
  const { confession, loading, error } = singleConfession;
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadSingleConfession(id));
    dispatch(loadComments(id));
  }, []);
  return (
    <div className="mt-5">
      {loading ? (
        <SpinnerComonent />
      ) : (
        <Confession singleScreen={true} confession={confession} />
      )}
      <div className="subcomments-container">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default SingleConfession;
