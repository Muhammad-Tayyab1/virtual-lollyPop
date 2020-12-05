const { ApolloServer, gql } = require('apollo-server-lambda');
const { default: Axios } = require('axios');
const faunadb = require("faunadb");
const q = faunadb.query;
const shortId = require("shortid")
require("dotenv").config();
const typeDefs = gql`
  type Query {
    hello: String
    getLollies: [Lolly]
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
     createLolly (
       recipientName: String!,
       message: String!,
       senderName: String!,
       flavourTop: String!, 
       flavourMiddle: String!,
       flavourBottom: String!
      ): Lolly 
   }
  `
const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.LOLLY_SECRET,
        });

        const result = await client.query(
          query.Map(
            query.Paginate(query.Match(query.Index("lolly_by_path"))),
            query.Lambda("x", query.Get(query.Var("x")))
          )
        );

        return result.data.map((d) => {
          return {
            id: d.ref.id,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom,
            recipientName: d.data.recipientName,
            message: d.data.message,
            senderName: d.data.senderName,
            lollyPath: d.data.lollyPath,
          };
        });
      } catch (error) {
        console.log("Error in fetching Data : ", error);
      }
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      const client = new faunadb.Client({ secret: process.env.LOLLY_SECRET })
      const id = shortId.generate();
      args.lollyPath = id;

      const result = await client.query(
        q.Create(q.Collection("lollies"), {
          data: args
        })
      );
      console.log('Result', result);
      console.log('Result', result.data);

      Axios
      .post("https://api.netlify.com/build_hooks/5fc20f9f9ad37b0da2257b3b")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
      return  {
          id: result.ref.id,
          flavourTop: result.data.flavourTop,
          flavourMiddle: result.data.flavourMiddle,
          flavourBottom: result.data.flavourBottom,
          recipientName: result.data.recipientName,
          message: result.data.message,
          senderName: result.data.senderName,
          lollyPath: result.data.lollyPath,
        };

    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }