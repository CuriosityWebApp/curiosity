const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('dotenv').config();

const stripe = require('stripe')(process.env.stripe_secret_key);
const schema = require('../database/graphQL/schema.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.DBLINK,
  { useCreateIndex: true, useNewUrlParser: true },
);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB..'))
  .on('error', error => console.log('Error connecting to DB'));

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.post('/charge', (req, res) => {
  const token = req.body.token.token;

  stripe.charges
    .create({
      amount: Number(req.body.usd) * 100,
      currency: 'usd',
      description: 'Example charge',
      source: token.id,
      statement_descriptor: 'Custom descriptor',
    })
    .then((data) => {
      res.send(data);
    });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
