const User = require('../../database/model/user.js');
const Question = require('../../database/model/question.js');
const Answer = require('../../database/model/answer.js');
const Transaction = require('../../database/model/transaction.js');
const Message = require('../../database/model/message.js');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const {
  UserType,
  QuestionType,
  AnswerType,
  TransactionType,
  MessageType,
} = require('./typeDefs.js');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return User.findById(args.id);
      },
    },
    question: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Question.findById(args.id);
      },
    },
    answer: {
      type: AnswerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Answer.findById(args.id);
      },
    },
    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Transaction.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Question.find({});
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent, args) {
        return Answer.find({});
      },
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args) {
        return Transaction.find({});
      },
    },
    checkUserEmail: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        return User.findOne({ email: args.email });
      },
    },
    searchQuestion: {
      type: new GraphQLList(QuestionType),
      args: { term: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        return Question.find({ $text: { $search: args.term } });
      },
    },
    userMessages: {
      type: new GraphQLList(MessageType),
      args: { receiverId: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.find({ receiverId: args.receiverId }).sort('-createdAt');
      },
    },
    findUsername: {
      type: new GraphQLList(UserType),
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find({ username: { $regex: args.username, $options: 'i' } });
      },
    },
  },
});

module.exports = { RootQuery };
