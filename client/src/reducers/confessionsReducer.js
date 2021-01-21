export const confessionReducer = (state = { confessions: [] }, action) => {
  switch (action.type) {
    case "CONFESSIONS_LOAD_REQUEST":
      return { ...state, loading: true };
    case "CONFESSIONS_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        confessions: [...state.confessions, ...action.payload],
      };
    case "CONFESSIONS_LOAD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
