const express = require("express");
const cors = require("cors");
const ApolloServer = require("apollo-server-express");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1/store");
mongoose.connection.once("open", () => {
  console.log("Connected DB Successfully");
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({app})

};

startServer();

app.listen(4005, () => {
    console.log("Server running on port 4004");
  });