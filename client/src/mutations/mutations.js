import { gql } from 'apollo-boost';

const AddQuestion = gql`
	mutation(
		$userId: ID!
		$questionTitle: String!
		$questionContent: String!
		$category: String
		$bounty: Int!
		$restriction: Int!
		$tags: [String]
	) {
		addQuestion(
			userId: $userId
			questionTitle: $questionTitle
			questionContent: $questionContent
			category: $category
			bounty: $bounty
			restriction: $restriction
			tags: $tags
		) {
			id
		}
	}
`;

const AddAnswer = gql`
	mutation($userId: ID!, $questionId: ID!, $answer: String!) {
		addAnswer(userId: $userId, questionId: $questionId, answer: $answer) {
			id
		}
	}
`;

const AddUser = gql`
	mutation($username: String!, $email: String!) {
		addUser(username: $username, email: $email) {
			id
			username
		}
	}
`;

const AddTransaction = gql`
	mutation($questionId: ID!, $senderId: ID!, $receiverId: ID!, $amount: Int!) {
		addTransaction(questionId: $questionId, senderId: $senderId, receiverId: $receiverId, amount: $amount) {
			id
		}
	}
`;

const UpdateCredit = gql`
	mutation($id: ID!, $credit: Int) {
		updateCredit(id: $id, credit: $credit) {
			id
		}
	}
`;
const UpdatePaid = gql`
	mutation($id: ID!, $bountyPaid: Boolean) {
		updatePaid(id: $id, bountyPaid: $bountyPaid) {
			id
		}
	}
`;

const UpdateChosenAnswer = gql`
	mutation($id: ID!, $answerChosen: Boolean) {
		updateChosenAnswer(id: $id, answerChosen: $answerChosen) {
			id
		}
	}
`;
const DeleteMessage = gql`
	mutation($id: ID!) {
		deleteMessage(id: $id) {
			id
		}
	}
`;

const AnswerLike = gql`
	mutation($id: ID!, $userId: ID!, $method: String!) {
		AnswerRatedUpBy(id: $id, userId: $userId, method: $method) {
			id
			score
			ratedUpBy
			ratedDownBy
		}
	}
`;
const AnswerDislike = gql`
	mutation($id: ID!, $userId: ID!, $method: String!) {
		AnswerRatedDownBy(id: $id, userId: $userId, method: $method) {
			id
			score
			ratedUpBy
			ratedDownBy
		}
	}
`;

const QuestionLike = gql`
	mutation($id: ID!, $userId: ID!, $method: String!) {
		QuestionRatedUpBy(id: $id, userId: $userId, method: $method) {
			id
			score
			ratedUpBy
			ratedDownBy
		}
	}
`;
const QuestionDislike = gql`
	mutation($id: ID!, $userId: ID!, $method: String!) {
		QuestionRatedDownBy(id: $id, userId: $userId, method: $method) {
			id
			score
			ratedUpBy
			ratedDownBy
		}
	}
`;

const IncrementQuestionViews = gql`
	mutation($id: ID!) {
		IncrementQuestionViews(id: $id) {
			id
			views
		}
	}
`;
const AddMessage = gql`
	mutation($senderId: ID!, $receiverId: ID!, $messageTitle: String!, $messageContent: String!) {
		addMessage(
			senderId: $senderId
			receiverId: $receiverId
			messageTitle: $messageTitle
			messageContent: $messageContent
		) {
			id
		}
	}
`;
const ReadMessages = gql`
	mutation($receiverId: ID) {
		ReadMessages(receiverId: $receiverId) {
			id
		}
	}
`;

const ClearNotifications = gql`
	mutation($id: ID) {
		ClearNotifications(id: $id) {
			id
		}
	}
`;

const UpdateUserAvatar = gql`
	mutation($id: ID!, $avatarUrl: String!) {
		UpdateUserAvatar(id: $id, avatarUrl: $avatarUrl) {
			id
		}
	}
`;

const AddTagsToFavorites = gql`
	mutation($userId: ID!, $tag: String!) {
		addTagsToFavorites(id: $userId, tag: $tag) {
			favoriteTags
		}
	}
`;

const DeleteTagsFromFavorites = gql`
	mutation($userId: ID!, $tag: String!) {
		removeTagsFromFavorites(id: $userId, tag: $tag) {
			favoriteTags
		}
	}
`;

module.exports = {
  AddQuestion,
  AddAnswer,
  AddUser,
  AddTransaction,
  AddTagsToFavorites,
  DeleteTagsFromFavorites,
  AnswerLike,
  AnswerDislike,
  UpdateCredit,
  UpdatePaid,
  UpdateChosenAnswer,
  DeleteMessage,
  AddMessage,
  QuestionLike,
  QuestionDislike,
  ReadMessages,
  ClearNotifications,
  IncrementQuestionViews,
  UpdateUserAvatar,
};
