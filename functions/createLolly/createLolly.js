const { ApolloServer, gql } = require('apollo-server-lambda');
const { default: Axios } = require('axios');
const faunadb = require("faunadb");
const q = faunadb.query;
const shortId = require("shortid")
require("dotenv").config();
const typeDefs = gql`
  type Query {
    getLollies: [Lolly]!
  }
  
  type Lolly {
    id: ID!
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
       recipientName: String!
       message: String!
       senderName: String!
       flavourTop: String! 
       flavourMiddle: String!
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
            id: d.ts,
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
    createLolly: async (_, {recipientName,message,senderName,flavourTop,flavourMiddle, flavourBottom, lollyPath}) => {
      const client = new faunadb.Client({ secret: process.env.LOLLY_SECRET })
        const result = await client.query(
        q.Create(q.Collection("lollies"), {
          data: {
             recipientName,
             message,
             senderName,
             flavourTop,
             flavourMiddle,
             flavourBottom,
             lollyPath:shortId.generate(),
          }
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
      return result.data;

    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }