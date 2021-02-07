import axios from "axios";

//loads the comments of a confession based on the confession id
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

//fetches the subcomments (comments of a comment) based on the comment id
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

//post a comment if the user has been loged in or a subcomment if the parameter subbcoment has been set to true insetead of its false default value
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
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;

    console.log(errorMessage);
  }
};

//sends data to the server to add / remove a like based on the id of a comment
export const like = (id) => {
  axios.post(`/api/likesdislikes/comment/like/${id}`);
};

//sends data to the server to add / remove a dislike based on the id of a comment
export const dislike = (id) => {
  axios.post(`/api/likesdislikes/comment/dislike/${id}`);
};

//checks if a comment or a confession has been liked , the data provided looks like { liked: true, disliked: false }
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
