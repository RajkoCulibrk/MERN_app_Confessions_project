export const setError = (text) => (dispatch) => {
  dispatch({
    type: "SET_ERROR",
    payload: { id: [Date.now()], text },
  });
};
