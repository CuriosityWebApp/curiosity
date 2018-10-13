const _ = require('lodash');
const Mongoose = require('mongoose');

const ObjectId = Mongoose.Types.ObjectId;
const User = require('../../database/model/user.js');
const Question = require('../../database/model/question.js');
const Answer = require('../../database/model/answer.js');
const Transaction = require('../../database/model/transaction.js');
const Message = require('../../database/model/message.js');
const {
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean,
} = require('graphql');
const {
  UserType, QuestionType, AnswerType, TransactionType, MessageType,
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
        sortBy: { type: GraphQLString },
        range: { type: GraphQLString },
      },
      resolve(parent, {
        limit, skip, sortBy, range, filter,
      }) {
        const today = new Date();
        const day = 86400000; // number of milliseconds in a day
        const days = range || 0;
        const daysAgo = new Date(today - days * day);
        // no args passed in
        if (filter === '' && sortBy === '') {
          return Question.find()
            .sort({ createdAt: -1, views: -1, bounty: -1 })
            .skip(skip)
            .limit(limit);
        }
        // getting items just bassed on filter
        if (filter !== '' && sortBy === '') {
          return Question.find({
            $or: [
              { category: { $regex: filter, $options: 'i' } },
              { tags: { $regex: filter, $options: 'i' } },
            ],
          })
            .sort({ createdAt: -1, views: -1, bounty: -1 })
            .skip(skip)
            .limit(limit);
        }
        // getting items based on passed sort option and range if provided
        if (sortBy !== '' && sortBy !== 'top') {
          // if range but no filter
          let newRange = range ? { createdAt: { $gte: daysAgo } } : {};
          // if range and filter
          range && filter
            ? (newRange = { createdAt: { $gte: daysAgo }, category: filter })
            : (newRange = range);
          return Question.find(newRange)
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit);
        }
        // finds the top questions + if filter is passed will sum both of them
        if (sortBy === 'top') {
          let criteria = filter ? { category: filter } : {};
          if (range && filter) {
            criteria = {
              $or: [
                { category: { $regex: filter, $options: 'i' } },
                { tags: { $regex: filter, $options: 'i' } },
              ],
              createdAt: { $gte: daysAgo },
            };
          } else if (range && !filter) {
            criteria = { createdAt: { $gte: daysAgo } };
          }
          return Question.aggregate([
            { $match: criteria },
            {
              $project: {
                score: {
                  $subtract: [
                    { $size: { $ifNull: ['$ratedUpBy', []] } },
                    { $size: { $ifNull: ['$ratedDownBy', []] } },
                  ],
                },
                createdAt: 1,
                views: 1,
              },
            },
            { $sort: { score: -1, views: -1, createdAt: -1 } },
          ])
            .skip(skip)
            .limit(limit)
            .then((data) => {
              const newData = [];
              data.forEach((item) => {
                newData.push({ id: item._id.toString() });
              });
              return newData;
            })
            .catch(err => console.error('error in questions query TOP', err));
        }
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      args: {
        questionId: { type: GraphQLID },
        skip: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Answer.aggregate([
          { $match: { questionId: args.questionId } },
          {
            $project: {
              score: {
                $subtract: [
                  { $size: { $ifNull: ['$ratedUpBy', []] } },
                  { $size: { $ifNull: ['$ratedDownBy', []] } },
                ],
              },
              createdAt: 1,
              answerChosen: 1,
            },
          },
          { $sort: { answerChosen: -1, createdAt: 1, score: -1 } },
        ])
          .skip(args.skip)
          .limit(args.limit)
          .then((data) => {
            const newData = [];
            data.forEach(item => newData.push({ id: item._id.toString() }));
            return newData;
          })
          .catch(err => console.error('error in getting asnwers', err));
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
        }).limit(25);
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
