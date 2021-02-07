export const commentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case "LOAD_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: [...action.payload],
      };
    case "POST_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};

export const subcommentReducer = (state = { subcomments: [] }, action) => {
  switch (action.type) {
    case "LOAD_SUBCOMMENTS_SUCCESS":
      let temp = [...action.payload, ...state.subcomments];
      let filteredComments = [];
      temp.forEach((com) => {
        if (!filteredComments.some((x) => x._id === com._id)) {
          filteredComments.push(com);
        }
      });

      return {
        ...state,
        subcomments: [...filteredComments],
      };
    case "POST_SUBCOMMENT":
      return {
        ...state,
        subcomments: [action.payload, ...state.subcomments],
      };

    default:
      return state;
  }
};
