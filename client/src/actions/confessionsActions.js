import axios from "axios";

// for fetching the confessions , pagination sorting and filtering , the one parameter received looks like { page:1, sortBy:'created_at', sortOrder:'-' }
export const loadConfessions = (paginate) => async (dispatch) => {
  try {
    dispatch({
      type: "CONFESSIONS_LOAD_REQUEST",
    });

    const { data } = await axios.post("/api/confessions/getconfessions", {
      ...paginate,
    });

    dispatch({
      type: "CONFESSIONS_LOAD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    dispatch({
      type: "CONFESSIONS_LOAD_FAIL",
      payload: errorMessage,
    });
  }
};

//sends the data to the server for adding / removing the like of a confesion based on the id of confession
export const like = (id) => {
  axios.post(`/api/likesdislikes/confession/like/${id}`);
};

//sends the data to the server for adding / removing the dislike of a confesion based on the id of confession
export const dislike = (id) => {
  axios.post(`/api/likesdislikes/confession/dislike/${id}`);
};

//checks if a comment or a confession has been liked , the data provided looks like { liked: true, disliked: false }
export const checkIfLiked = async (id) => {
  try {
    const { data } = await axios.post("/api/likesdislikes/", {
      confession: id,
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

//sends data to the server for a confession to be created only the text (body) of a confession needs to be provided
export const postConfession = (body) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_CONFESSION_REQUEST",
    });
    const { data: confession } = await axios.post("/api/confessions", { body });
    dispatch({
      type: "POST_CONFESSION_SUCCESS",
      payload: confession,
    });
    console.log(confession);
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;

    console.log(errorMessage);
  }
};

/// fetches a singe confession from the server based on its id
export const loadSingleConfession = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "CONFESSION_LOAD_REQUEST",
    });

    const { data } = await axios.get(`/api/confessions/${id}`);

    dispatch({
      type: "CONFESSION_LOAD_SUCCESS",
      payload: data.confession,
    });
  } catch (error) {
    let errorMessage = error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.response.data.msg;
    dispatch({
      type: "CONFESSION_LOAD_FAIL",
      payload: errorMessage,
    });
  }
};

// sets the sort order to '-' for descending or "" for ascending
export const setSortOrder = (sortOrder) => async (dispatch) => {
  await dispatch({
    type: "SET_SORT_ORDER",
    payload: sortOrder,
  });
};

//sets the sort by parameter to "likes",'comments',"dislikes" ...
export const setSortBy = (sortBy) => async (dispatch) => {
  await dispatch({
    type: "SET_SORT_BY",
    payload: sortBy,
  });
};

// resets the confessions aray to empty array
export const resetConfessions = () => async (dispatch) => {
  await dispatch({
    type: "RESET_CONFESSIONS",
  });
};

// resets the page prameter needed for pagination to 1 which is its default value
export const resetPage = () => async (dispatch) => {
  await dispatch({
    type: "RESET_PAGE",
  });
};
