const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../config.js');

const stripe = require('stripe')(config.stripe_secret_key);
const schema = require('../database/graphQL/schema.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  'mongodb://hyunjae9034:test1234@ds117773.mlab.com:17773/practice',
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

app.listen(3000, () => {
  console.log('listening to port 3000');
});
