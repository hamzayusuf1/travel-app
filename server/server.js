const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./config/connection");
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const uuid = require("uuid").v4;

const convertAdressToCoordinates = require("./utils/address");
const Place = require("./models/Place");

//image endpoints
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 100000000, files: 2 } });
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ msg: "success" });
});

//uuid-original-name

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

const { graphqlUploadExpress } = require("graphql-upload-minimal");

const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

//New post resolver using specific middleWare
// const imageMiddleware = {
//   Mutation: {
//     addThoughts: async (_, { title, address, description, image }, context) => {
//       console.log(title);
//       console.log(image);
//       // let coordinates;
//       // try {
//       //   coordinates = await convertAdressToCoordinates(address);
//       // } catch (error) {}

//       // coordinates = await convertAdressToCoordinates(address);

//       // const place = await Place.create({
//       //   title,
//       //   description,
//       //   address,
//       //   location: coordinates,
//       //   likes: [],
//       //   // creator: context.user._id,
//       // });

//       // await User.findOneAndUpdate(
//       //   { _id: context.user._id },
//       //   { $addToSet: { places: place._id } },
//       //   {
//       //     new: true,
//       //     runValidators: true,
//       //   }
//       // );

//       return place;
//     },
//   },
// };

const apolloServer = new ApolloServer({
  schema,
  context: authMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // subscriptions: {
  //   path: "/subscriptions",
  // },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(graphqlUploadExpress());
//multer error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.json({
        msg: "file is too large",
      });
    }
    if (err.code === "LIMIT_FIELD_COUNT") {
      return res.json({
        msg: "file limit reached",
      });
    }
  }
});

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
  httpServer.listen(port, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
})();
