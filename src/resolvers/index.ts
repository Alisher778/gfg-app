import books from '../mocks/books';

export const RootResolvers = {
  Query: {
    books: (_, args, context, info) => {
      return books;
    },
    authors: (_, args, context, info) => {
      return books;
    },

  }
}