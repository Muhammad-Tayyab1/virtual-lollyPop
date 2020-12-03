const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb");
const q = faunadb.query;
const shortId = require("shortid")
const typeDefs = gql`
  type Query {
    hello: String
    
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
   type Mutation {
     createLolly (recipientName: String!, message: String!, senderName: String!, flavourTop: String!, flavourMiddle: String!, flavourBottom: String!): Lolly 
   }
  `
const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, world!'
    },

  },
  Mutation: {
    createLolly: async(_, args) => {
      const client = new faunadb.Client({ secret: "fnAD8HoDaZACASEvWLq_iqfcUebwH2pnF7GbGdp1" })
      const id = shortId.generate();
      args.lollyPath = id;
      
      const result= await client.query(
        q.Create(q.Collection("lollies"), {
          data: args
        })
      );
      console.log('Result', result);
      console.log('Result', result.data);

      return result.data
      
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
