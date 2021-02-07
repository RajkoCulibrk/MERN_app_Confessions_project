const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ERROR":
      return [...state, action.payload];
    case "REMOVE_ERROR": {
      return [...state.filter((error) => error.id !== action.payload)];
    }

    default:
      return state;
  }
};

export default errorsReducer;
