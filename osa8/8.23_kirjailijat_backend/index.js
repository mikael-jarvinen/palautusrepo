const { ApolloServer, gql } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'helousthaloust'

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
  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
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
      return {
        name: author.name,
        born: author.born,
        id: author.id
      }
    } 
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({...args})

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'örkki') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
    editAuthor: async (root, args, context) => {
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
    addBook: async (root, args, context) => {
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
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})