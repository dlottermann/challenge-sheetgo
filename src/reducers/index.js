export const initialState = {
  count: 0,
  loading: true,
  books: JSON.parse(localStorage.getItem("books")) || [],
  comments: JSON.parse(localStorage.getItem("comments")) || [],
  categories: [
    {
      id: "reading",
      title: "Currently Reading"
    },
    {
      id: "wantToRead",
      title: "Want to Read"
    },
    {
      id: "read",
      title: "Read"
    }
  ]
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE":
      return {
        ...state,
        books: action.payload
      };
    case "DELETEBOOK":
      return {
        ...state,
        books: action.payload
      };
    case "UPDATEBOOK":
      return {
        ...state,
        books: action.payload
      };
    case "SAVECOMMENT":
      return {
        ...state,
        comments: action.payload
      };
    case "UPDATECOMMENT":
      return {
        ...state,
        comments: action.payload
      };
    case "DELETECOMMENT":
      return {
        ...state,
        comments: action.payload
      };
    case "BOOKS":
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
