const paginationReducer = (state = { page: 1 }, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      console.log("pagination");
      return {
        page: state.page + 1,
      };
    default:
      return state;
  }
};
export default paginationReducer;
