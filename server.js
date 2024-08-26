const express = require("express");
const cors = require("cors");
const {ApolloServer} = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require("./graphql/index.schema");
const resolvers = require("./graphql/index.resolvers");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, PUT, POST, DELETE , OPTIONS",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
  console.log("Connected DB Successfully");
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  server.applyMiddleware({ app });
};

startServer();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
