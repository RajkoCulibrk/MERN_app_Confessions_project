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
      let picka = [];
      temp.forEach((com) => {
        if (!picka.some((x) => x._id === com._id)) {
          picka.push(com);
        }
      });
      console.log(picka, "fffffffff");
      return {
        ...state,
        subcomments: [...picka],
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
