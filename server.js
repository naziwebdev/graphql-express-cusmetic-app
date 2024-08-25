const express = require("express");
const cors = require("cors");
const ApolloServer = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require('./graphql/index.schema')
require("dotenv").config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URL);
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

const port = process.env.PORT

app.listen( port , () => {
    console.log(`Server running on port ${port}`);
  });