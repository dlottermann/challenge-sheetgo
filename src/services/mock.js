/*
Mock examples of structure and add fix data (categories)
*/

export const categories = [
  {
    reading: "Currently Reading"
  },
  {
    wantToRead: "Want to Read"
  },
  {
    read: "Read"
  }
];

export const books = [
  {
    id: 1,
    timestamp: Date.now(),
    title: "titulo",
    description: "description",
    author: "Author",
    category: null,
    deleted: false
  }
];

export const comments = [
  {
    id: 1,
    parentId: 1,
    timestamp: Date.now(),
    body: "Comentário",
    author: "Author",
    deleted: false
  }
];
