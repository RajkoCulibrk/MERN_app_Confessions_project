import axios from "axios";

export const loadComments = (id) => async (dispatch) => {
  try {
    let { data: comments } = await axios.get(`/api/comments/confession/${id}`);
    dispatch({
      type: "LOAD_COMMENTS_SUCCESS",
      payload: comments,
    });
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    console.log(errorMessage);
  }
};

export const loadSubcomments = (id) => async (dispatch) => {
  try {
    let { data: comments } = await axios.get(`/api/comments/subcomment/${id}`);

    dispatch({
      type: "LOAD_SUBCOMMENTS_SUCCESS",
      payload: comments,
    });
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    console.log(errorMessage);
  }
};

export const postComment = (confession, body, subcomment = false) => async (
  dispatch
) => {
  try {
    if (subcomment) {
      const { data: comment } = await axios.post("/api/comments", {
        comment: subcomment,
        body,
      });

      dispatch({
        type: "POST_SUBCOMMENT",
        payload: comment,
      });
    } else {
      const { data: comment } = await axios.post("/api/comments", {
        confession,
        body,
      });
      dispatch({
        type: "POST_COMMENT",
        payload: comment,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const like = (id) => {
  axios.post(`/api/likesdislikes/comment/like/${id}`);
};
export const dislike = (id) => {
  axios.post(`/api/likesdislikes/comment/dislike/${id}`);
};

export const checkIfLiked = async (id) => {
  try {
    const { data } = await axios.post("/api/likesdislikes/", {
      comment: id,
    });
    return data;
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    console.log(error.message);
    console.log(errorMessage);
  }
};
