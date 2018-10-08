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

const UpdatePostLikes = gql`
	mutation($id: ID!, $score: Int) {
		likesOnQuestion(id: $id, score: $score) {
			id
			score
		}
	}
`;
const UpdateAnswerLikes = gql`
	mutation($userId: ID!, $answerId: ID!, $score: Int) {
		likesOnAnswer(id: $answerId, score: $score) {
			id
			score
		}
		updateUserRank(id: $userId, rank: $score) {
			id
			rank
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

module.exports = {
  AddQuestion,
  AddAnswer,
  AddUser,
  AddTransaction,
  AnswerLike,
  AnswerDislike,
  UpdatePostLikes,
  UpdateCredit,
  UpdatePaid,
};
