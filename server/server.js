// const express = require("express");
// const app = express();
// const db = require("./config/connection");
// const path = require("path");
// const PORT = process.env.port || 3001;
// const { authMiddleware } = require("./utils/auth");

// const { ApolloServer } = require("@apollo/server");
// const { createServer } = require("http");
// const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { expressMiddleware } = require("@apollo/server/express4");
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require("@apollo/server/plugin/drainHttpServer");
// const bodyParser = require("body-parser");

// const routes = require("./routes");

// const { typeDefs, resolvers } = require("./schemas");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// app.use(routes);

// const schema = makeExecutableSchema({ typeDefs, resolvers });

// const httpServer = createServer(app);

// const apolloServer = new ApolloServer({
//   schema,
//   context: authMiddleware,
//   plugins: [
//     //proper shutdown for HTTP Server
//     ApolloServerPluginDrainHttpServer({ httpServer }),
//   ],
// });

// // const startApolloServer = async (typeDefs, resolvers) => {
// //   await server.start();
// //   server.applyMiddleware({ app });

// //   db.once("open", () => {
// //     app.listen(PORT, () => {
// //       console.log(`API server running on port ${PORT}!`);
// //       console.log(
// //         `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
// //       );
// //     });
// //   });
// // };

// // startApolloServer(typeDefs, resolvers);

// //starting apollo server to expose endpoint to client
// await apolloServer.start();

// app.use("graphql", bodyParser.json(), expressMiddleware(apolloServer));

// db.once("open", () => {
//   httpServer.listen(PORT, () => {
//     console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
//     console.log(
//       `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
//     );
//   });
// });

const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const db = require("./config/connection");
const path = require("path");
require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { useServer } = require("graphql-ws/lib/use/ws");

const routes = require("./routes");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const { default: mongoose } = require("mongoose");

const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphq1",
});

const apolloServer = new ApolloServer({
  schema,
  context: authMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

mongoose.connect(process.env.MONGODB_URI);
app.use(routes);

// Serve the GraphQL endpoint
// apolloServer.applyMiddleware({ app });

(async () => {
  useServer({ schema }, wsServer);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})();
