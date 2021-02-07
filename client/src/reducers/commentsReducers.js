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
      /// filtering only the subcomments of a specifing comment so the comment gets only the the replies that are refering that comment and not comments of some other comment. And in this way we re awoiding seeing the comment h=that we have posted and that fetched from the database twice because when we post a comment it gets added to other comments on the client side and siplayed right away so when we fetch other commens we get that same comment that we posted againg. In this way that comment won appear tow times
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
