import axios from "axios";

export const loadConfessions = (page) => async (dispatch) => {
  try {
    dispatch({
      type: "CONFESSIONS_LOAD_REQUEST",
    });

    const { data } = await axios.post("/api/confessions/getconfessions", {
      ...page,
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

export const like = (id) => {
  axios.post(`/api/likesdislikes/confession/like/${id}`);
};
export const dislike = (id) => {
  axios.post(`/api/likesdislikes/confession/dislike/${id}`);
};

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

export const setSortOrder = (sortOrder) => async (dispatch) => {
  await dispatch({
    type: "SET_SORT_ORDER",
    payload: sortOrder,
  });
};

export const setSortBy = (sortBy) => async (dispatch) => {
  await dispatch({
    type: "SET_SORT_BY",
    payload: sortBy,
  });
};

export const resetConfessions = () => async (dispatch) => {
  await dispatch({
    type: "RESET_CONFESSIONS",
  });
};
export const resetPage = () => async (dispatch) => {
  await dispatch({
    type: "RESET_PAGE",
  });
};
