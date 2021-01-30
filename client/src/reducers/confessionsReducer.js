export const confessionReducer = (state = { confessions: [] }, action) => {
  switch (action.type) {
    case "CONFESSIONS_LOAD_REQUEST":
      return { ...state, loading: true };
    case "CONFESSIONS_LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        confessions: [...state.confessions, ...action.payload.confessions],
        end: action.payload.end,
      };
    case "CONFESSIONS_LOAD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POST_CONFESSION_REQUEST":
      return {
        ...state,
        submitting: true,
      };
    case "POST_CONFESSION_success":
      return {
        ...state,
        confessions: [action.payload, ...state.confessions],
        submitting: false,
      };
    default:
      return state;
  }
};

export const singleConfessionReducer = (
  state = { confession: false, loading: true },
  action
) => {
  switch (action.type) {
    case "CONFESSION_LOAD_REQUEST":
      return { ...state, loading: true };
    case "CONFESSION_LOAD_SUCCESS":
      return {
        ...state,
        confession: action.payload,
        loading: false,
      };
    case "CONFESSION_LOAD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
