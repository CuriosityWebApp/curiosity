const User = require('../model/user.js');
const Question = require('../model/question.js');
const Answer = require('../model/answer.js');
const Transaction = require('../model/transaction.js');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const {
  UserType, QuestionType, AnswerType, TransactionType,
} = require('./typeDefs.js');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
        rank: { type: GraphQLInt },
        credit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = new User({
          userId: args.userId,
          username: args.username,
          rank: args.rank,
          credit: args.credit,
        });
        return user.save();
      },
    },
    addQuestion: {
      type: QuestionType,
      args: {
        userId: { type: GraphQLID },
        question: { type: GraphQLString },
        category: { type: GraphQLString },
        bounty: { type: GraphQLInt },
        bountyPaid: { type: GraphQLBoolean },
        restriction: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const question = new Question({
          userId: args.userId,
          question: args.question,
          category: args.category,
          bounty: args.bounty,
          bountyPaid: false,
          restriction: args.restriction,
          tags: args.tags,
        });
        return question.save();
      },
    },
    addAnswer: {
      type: AnswerType,
      args: {
        userId: { type: GraphQLID },
        questionId: { type: GraphQLID },
        answer: { type: GraphQLString },
        score: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const answer = new Answer({
          userId: args.userId,
          questionId: args.questionId,
          answer: args.answer,
          score: args.score,
        });
        return answer.save();
      },
    },
    addTransaction: {
      type: TransactionType,
      args: {
        questionId: { type: GraphQLID },
        senderId: { type: GraphQLID },
        receiverId: { type: GraphQLID },
        amount: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const transaction = new Transaction({
          questionId: args.questionId,
          senderId: args.senderId,
          receiverId: args.receiverId,
          amount: args.amount,
        });
        return transaction.save();
      },
    },
  },
});

module.exports = { Mutation };
