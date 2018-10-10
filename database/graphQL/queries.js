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
      args: {
        limit: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        filter: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log('these are the args', args);
        if (!args.filter) {
          return Question.find()
            .skip(args.skip)
            .limit(args.limit);
        }
        return Question.find({
          $or: [
            { category: { $regex: args.filter, $options: 'i' } },
            { tags: { $regex: args.filter, $options: 'i' } },
          ],
        })
          .skip(args.skip)
          .limit(args.limit);
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
    checkUsername: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        return User.findOne({ username: args.username });
      },
    },
    searchQuestion: {
      type: new GraphQLList(QuestionType),
      args: { term: { type: GraphQLString } },
      resolve(parent, args) {
        return Question.find({
          $or: [
            { questionContent: { $regex: args.term, $options: 'i' } },
            { questionTitle: { $regex: args.term, $options: 'i' } },
            { category: { $regex: args.term, $options: 'i' } },
            { tags: { $regex: args.term, $options: 'i' } },
          ],
        });
      },
    },
    userMessages: {
      type: new GraphQLList(MessageType),
      args: { receiverId: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.find({ receiverId: args.receiverId }).sort('-createdAt');
      },
    },
    userSentMessages: {
      type: new GraphQLList(MessageType),
      args: { senderId: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.find({ senderId: args.senderId }).sort('-createdAt');
      },
    },
    getUsernames: {
      type: new GraphQLList(UserType),
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find({ username: { $regex: args.username, $options: 'i' } });
      },
    },
  },
});

module.exports = { RootQuery };
