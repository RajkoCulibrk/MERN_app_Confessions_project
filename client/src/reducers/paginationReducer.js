const paginationReducer = (
  state = { page: 1, sortOrder: "-1", sortBy: "created_at" },
  action
) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "RESET_PAGE":
      return {
        ...state,
        page: 1,
      };
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortOrder: action.payload,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};
export default paginationReducer;
