const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const path = require('path');

const schema = require('../database/graphQL/schema.js');

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb://hyunjae9034:test1234@ds117773.mlab.com:17773/practice',
  { useNewUrlParser: true },
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(3000, () => {
  console.log('listening to port 3000');
});
