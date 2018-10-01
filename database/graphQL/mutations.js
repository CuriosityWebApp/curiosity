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
  GraphQLNonNull
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
        username: { type: new GraphQLNonNull(GraphQLString) },
        rank: { type: GraphQLInt },
        credit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = new User({
          username: args.username,
          rank: 0,
          credit: 0,
        });
        return user.save();
      },
    },
    addQuestion: {
      type: QuestionType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        questionTitle: { type: new GraphQLNonNull(GraphQLString) },
        questionContent: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: GraphQLString },
        bounty: { type: new GraphQLNonNull(GraphQLInt) },
        restriction: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const question = new Question({
          userId: args.userId,
          questionTitle: args.questionTitle,
          questionContent: args.questionContent,
          category: args.category,
          bounty: args.bounty,
          restriction: args.restriction,
          tags: args.tags,
        });
        return question.save();
      },
    },
    addAnswer: {
      type: AnswerType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        questionId: { type: new GraphQLNonNull(GraphQLID) },
        answer: { type: new GraphQLNonNull(GraphQLString) },
        score: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const answer = new Answer({
          userId: args.userId,
          questionId: args.questionId,
          answer: args.answer,
          score: 0,
        });
        return answer.save();
      },
    },
    addTransaction: {
      type: TransactionType,
      args: {
        questionId: { type: new GraphQLNonNull(GraphQLID) },
        senderId: { type: new GraphQLNonNull(GraphQLID) },
        receiverId: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
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
    deleteQuestion: {
      type: QuestionType,
      args: {
        questionId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        return await Answer.deleteMany({questionId: args.questionId})
        .then(res => Question.findByIdAndRemove({_id: args.questionId}))
      }
    },
    deleteAnswer: {
      type: AnswerType,
      args: {
        answerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Answer.findByIdAndRemove({_id: args.answerId})
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        rank: { type: GraphQLInt },
        credit: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return User.findOneAndUpdate({ _id: args.id }, args, { new: false })
      }
    },
    updateQuestion: {
      type: QuestionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        questionTitle: { type: GraphQLString },
        questionContent: { type: GraphQLString },
        category: { type: GraphQLString },
        restriction: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Question.findOneAndUpdate({ _id: args.id }, args, { new: false })
      }
    },
    updateAnswer: {
      type: AnswerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        answer: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Answer.findOneAndUpdate({ _id: args.id }, args, { new: false })
      }
    }
  },
});

module.exports = { Mutation };
