const { ApolloServer, gql } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({})
      } else if (!args.genre) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id })
      } else if (!args.author) {
        const books = await Book.find({})
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id })
        return books.filter(book => book.genres.includes(args.genre))
      }
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },
  Book: {
    author: async root => {
      const author = await Author.findOne({ _id: root.author })
      console.log(author)
      return {
        name: author.name,
        born: author.born,
        id: author.id
      }
    } 
  },
  Mutation: {
    editAuthor: async (root, args) => {
      try {
        let editedAuthor = await Author.findOneAndUpdate(
          { name: args.name},
          { born: args.setBornTo },
          { new: true }
        )
        return editedAuthor
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    addBook: async (root, args) => {
      const newAuthor = new Author({
        name: args.author,
        born: null,
      })
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = await newAuthor.save()
        }
        const newBook = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        })
        const book = await newBook.save()
        return book
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})