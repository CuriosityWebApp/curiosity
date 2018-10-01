const User = require("../model/user.js");
const Question = require("../model/question.js");
const Answer = require("../model/answer.js");
const Transaction = require("../model/transaction.js");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    username: { type: GraphQLString },
    rank: { type: GraphQLInt },
    credit: { type: GraphQLInt },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Question.find({ userId: parent.id });
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent, args) {
        return Answer.find({ userId: parent.id });
      }
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args) {
        return Transaction.find({
          $or: [{ senderId: parent.id }, { receiverId: parent.id }]
        });
      }
    }
  })
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    question: { type: GraphQLString },
    category: { type: GraphQLString },
    bounty: { type: GraphQLInt },
    bountyPaid: { type: GraphQLBoolean },
    restriction: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent, args) {
        return Answer.find({ questionId: parent.id });
      }
    }
  })
});

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    questionId: { type: GraphQLID },
    answer: { type: GraphQLString },
    score: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    question: {
      type: QuestionType,
      resolve(parent, args) {
        return Question.findById(parent.questionId);
      }
    }
  })
});

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    questionId: { type: GraphQLID },
    senderId: { type: GraphQLID },
    receiverId: { type: GraphQLID },
    amount: { type: GraphQLInt },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
      }
    },
    recipient: {
      type: UserType,
      resolve(parent, args) {
        return Question.findById(parent.receiverId);
      }
    }
  })
});

module.exports = {
  UserType,
  QuestionType,
  AnswerType,
  TransactionType
};
