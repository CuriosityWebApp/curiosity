const GraphQLDate = require('graphql-date');
const User = require('../model/user.js');
const Question = require('../model/question.js');
const Answer = require('../model/answer.js');
const Transaction = require('../model/transaction.js');
const Message = require('../model/message.js');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    rank: {
      type: GraphQLInt,
      resolve(parent, args) {
        // aggregate all the answers
        // sum up all the ratedup and rateddown
        // return the length of retedup - rated down
        return Answer.find({ userId: parent.id })
          .then(data => data.reduce((sum, item) => {
            sum += item.score;
            console.log('sum', sum);
            return sum;
          }, 0))
          .catch(err => console.log('error in rank', err));

        // return Answer.aggregate([
        //   {$match: {$userId: parent.id}},
        //   {$project: {
        //      rank: {
        //        $sub
        //      }
        //   }}
        // ])
      },
    },
    credit: { type: GraphQLInt },
    avatarUrl: { type: GraphQLString },
    vouch: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    favoriteTags: { type: new GraphQLList(GraphQLString) },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Question.find({ userId: parent.id }).sort('-createdAt');
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent, args) {
        return Answer.find({ userId: parent.id }).sort('-createdAt');
      },
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parent, args) {
        return Transaction.find({
          $or: [{ senderId: parent.id }, { receiverId: parent.id }],
        });
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find({
          receiverId: parent.id,
        });
      },
    },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    questionTitle: { type: GraphQLString },
    questionContent: { type: GraphQLString },
    category: { type: GraphQLString },
    bounty: { type: GraphQLInt },
    bountyPaid: { type: GraphQLBoolean },
    restriction: { type: GraphQLInt },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    tags: { type: new GraphQLList(GraphQLString) },
    views: { type: GraphQLInt },
    score: {
      type: GraphQLInt,
      resolve(parent, args) {
        return Question.findById(parent.id)
          .then(data => data.ratedUpBy.length - data.ratedDownBy.length)
          .catch(err => console.log('error in question score: ', err));
      },
    },
    ratedUpBy: { type: new GraphQLList(GraphQLID) },
    ratedDownBy: { type: new GraphQLList(GraphQLID) },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      resolve(parent, args) {
        return Answer.find({ questionId: parent.id });
      },
    },
  }),
});

const AnswerType = new GraphQLObjectType({
  name: 'Answer',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    questionId: { type: GraphQLID },
    answer: { type: GraphQLString },
    score: {
      type: GraphQLInt,
      resolve(parent, args) {
        return Answer.findById(parent.id)
          .then(data => data.ratedUpBy.length - data.ratedDownBy.length)
          .catch(err => console.log('error in answer score: ', err));
      },
    },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    ratedUpBy: { type: new GraphQLList(GraphQLID) },
    ratedDownBy: { type: new GraphQLList(GraphQLID) },
    answerChosen: { type: GraphQLBoolean },
    questionerSeen: { type: GraphQLBoolean },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    question: {
      type: QuestionType,
      resolve(parent, args) {
        return Question.findById(parent.questionId);
      },
    },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    questionId: { type: GraphQLID },
    senderId: { type: GraphQLID },
    receiverId: { type: GraphQLID },
    amount: { type: GraphQLInt },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
      },
    },
    recipient: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiverId);
      },
    },
    questionName: {
      type: QuestionType,
      resolve(parent, args) {
        return Question.findById(parent.questionId);
      },
    },
  }),
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    senderId: { type: GraphQLID },
    receiverId: { type: GraphQLID },
    messageTitle: { type: GraphQLString },
    messageContent: { type: GraphQLString },
    unread: { type: GraphQLBoolean },
    createdAt: { type: GraphQLDate },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
      },
    },
    recipient: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiverId);
      },
    },
  }),
});

module.exports = {
  UserType,
  QuestionType,
  AnswerType,
  TransactionType,
  MessageType,
};
