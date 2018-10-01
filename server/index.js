const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("../database/graphQL/schema.js");

const app = express();

mongoose.connect(
  "mongodb://hyunjae9034:test1234@ds117773.mlab.com:17773/practice",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("listening to port 3000");
});
