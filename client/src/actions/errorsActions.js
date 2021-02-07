// adds new error to the error aray, for each error in the array one error message component will be displayed and removed after  3 seconds because the components dispatches the remove_error action with the id of the error
export const setError = (text) => (dispatch) => {
  dispatch({
    type: "SET_ERROR",
    payload: { id: [Date.now()], text },
  });
};
