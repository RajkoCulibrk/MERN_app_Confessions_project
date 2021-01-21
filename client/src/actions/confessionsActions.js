import axios from "axios";
export const loadConfessions = () => async (dispatch) => {
  try {
    console.log("helo");
    dispatch({
      type: "CONFESSIONS_LOAD_REQUEST",
    });

    const { data } = await axios.get("/api/confessions");
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
  const { data } = await axios.post("api/likesdislikes/", { confession: id });

  return data;
};
