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
const {
  UserType,
  QuestionType,
  AnswerType,
  TransactionType,
  MessageType,
} = require('./typeDefs.js');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        rank: { type: GraphQLInt },
        credit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const user = new User({
          username: args.username,
          email: args.email,
          rank: 0,
          credit: 0,
        });
        return user.save();
      },
    },
    addQuestion: {
      type: QuestionType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        questionTitle: { type: GraphQLNonNull(GraphQLString) },
        questionContent: { type: GraphQLNonNull(GraphQLString) },
        category: { type: GraphQLString },
        bounty: { type: GraphQLNonNull(GraphQLInt) },
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
        userId: { type: GraphQLNonNull(GraphQLID) },
        questionId: { type: GraphQLNonNull(GraphQLID) },
        answer: { type: GraphQLNonNull(GraphQLString) },
        score: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const answer = new Answer({
          userId: args.userId,
          questionId: args.questionId,
          answer: args.answer,
          score: 0,
          questionerSeen: false,
        });
        return answer.save();
      },
    },
    addTransaction: {
      type: TransactionType,
      args: {
        transactionMeans: { type: GraphQLNonNull(GraphQLString) },
        questionId: { type: GraphQLID },
        senderId: { type: GraphQLNonNull(GraphQLID) },
        receiverId: { type: GraphQLNonNull(GraphQLID) },
        amount: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const transaction = new Transaction({
          transactionMeans: args.transactionMeans,
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
        questionId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await Answer.deleteMany({ questionId: args.questionId }).then(res => Question.findByIdAndRemove({ _id: args.questionId }));
      },
    },
    deleteAnswer: {
      type: AnswerType,
      args: {
        answerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Answer.findByIdAndRemove({ _id: args.answerId });
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        rank: { type: GraphQLInt },
        credit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return User.findOneAndUpdate({ _id: args.id }, args, { new: false });
      },
    },
    updateQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        questionTitle: { type: GraphQLString },
        questionContent: { type: GraphQLString },
        category: { type: GraphQLString },
        restriction: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Question.findOneAndUpdate({ _id: args.id }, args, { new: false });
      },
    },
    updateAnswer: {
      type: AnswerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        answer: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Answer.findOneAndUpdate({ _id: args.id }, args, { new: false });
      },
    },

    updateUserRank: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        rank: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return User.findOneAndUpdate({ _id: args.id }, { $inc: { rank: args.rank } });
      },
    },
    updateCredit: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        credit: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return User.update({ _id: args.id }, { $inc: { credit: args.credit } });
      },
    },
    updatePaid: {
      type: QuestionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        bountyPaid: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Question.findOneAndUpdate({ _id: args.id }, args, { new: false });
      },
    },
    QuestionRatedUpBy: {
      type: QuestionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        userId: { type: GraphQLNonNull(GraphQLID) },
        method: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        if (args.method === 'add') {
          return Question.findOneAndUpdate({ _id: args.id }, { $push: { ratedUpBy: args.userId } });
        }
        if (args.method === 'delete') {
          return Question.findOneAndUpdate({ _id: args.id }, { $pull: { ratedUpBy: args.userId } });
        }
      },
    },
    QuestionRatedDownBy: {
      type: QuestionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        userId: { type: GraphQLNonNull(GraphQLID) },
        method: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        if (args.method === 'add') {
          return Question.findOneAndUpdate(
            { _id: args.id },
            { $push: { ratedDownBy: args.userId } },
          );
        }
        if (args.method === 'delete') {
          return Question.findOneAndUpdate(
            { _id: args.id },
            { $pull: { ratedDownBy: args.userId } },
          );
        }
      },
    },
    AnswerRatedUpBy: {
      type: AnswerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        userId: { type: GraphQLNonNull(GraphQLID) },
        method: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        if (args.method === 'add') {
          return Answer.findOneAndUpdate({ _id: args.id }, { $push: { ratedUpBy: args.userId } });
        }
        if (args.method === 'delete') {
          return Answer.findOneAndUpdate({ _id: args.id }, { $pull: { ratedUpBy: args.userId } });
        }
      },
    },
    AnswerRatedDownBy: {
      type: AnswerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        userId: { type: GraphQLNonNull(GraphQLID) },
        method: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        if (args.method === 'add') {
          return Answer.findOneAndUpdate({ _id: args.id }, { $push: { ratedDownBy: args.userId } });
        }
        if (args.method === 'delete') {
          return Answer.findOneAndUpdate({ _id: args.id }, { $pull: { ratedDownBy: args.userId } });
        }
      },
    },

    IncrementQuestionViews: {
      type: QuestionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Question.findOneAndUpdate({ _id: args.id }, { $inc: { views: 1 } });
      },
    },
    addTagsToFavorites: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        tag: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, tag }) {
        return User.findOneAndUpdate({ _id: id }, { $push: { favoriteTags: tag } });
      },
    },

    removeTagsFromFavorites: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        tag: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, tag }) {
        return User.findOneAndUpdate({ _id: id }, { $pull: { favoriteTags: tag } });
      },
    },

    addMessage: {
      type: MessageType,
      args: {
        senderId: { type: GraphQLNonNull(GraphQLID) },
        receiverId: { type: GraphQLNonNull(GraphQLID) },
        messageTitle: { type: GraphQLNonNull(GraphQLString) },
        messageContent: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const message = new Message({
          senderId: args.senderId,
          receiverId: args.receiverId,
          messageTitle: args.messageTitle,
          messageContent: args.messageContent,
          unread: true,
        });
        return message.save();
      },
    },
    deleteMessage: {
      type: MessageType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Message.findByIdAndRemove({ _id: args.id });
      },
    },

    userMessages: {
      type: new GraphQLList(MessageType),
      args: { receiverId: { type: GraphQLID } },
      resolve(parent, args) {
        return Message.find({ receiverId: args.receiverId }).sort('-createdAt');
      },
    },

    updateChosenAnswer: {
      type: AnswerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        answerChosen: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Answer.findByIdAndUpdate({ _id: args.id }, args, { new: false });
      },
    },
    ReadMessages: {
      type: MessageType,
      args: {
        receiverId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Message.updateMany({ receiverId: args.receiverId }, { unread: false });
      },
    },
    ClearNotifications: {
      type: AnswerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Answer.updateMany({ _id: args.id }, { questionerSeen: true });
      },
    },
    UpdateUserAvatar: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        avatarUrl: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate({ _id: args.id }, args, { new: false });
      },
    },
    AddVouch: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        vouch: { type: GraphQLString },
        add: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        if (args.add) {
          await User.findById(args.id).then((data) => {
            if (!data.vouch.includes(args.vouch)) {
              return User.findOneAndUpdate(
                { _id: args.id },
                { $push: { vouch: args.vouch } },
                { new: false },
              );
            }
          });
        } else {
          await User.findById(args.id).then((data) => {
            if (data.vouch.includes(args.vouch)) {
              return User.findOneAndUpdate(
                { _id: args.id },
                { $pull: { vouch: args.vouch } },
                { new: false },
              );
            }
          });
        }
      },
    },
  },
});

module.exports = { Mutation };
