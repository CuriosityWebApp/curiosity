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
		addTransaction(questionId: $questionId, senderId: $senderId, receiverId: $receiverId, amount: $amountId) {
			id
		}
	}
`;

const UpdateCredit = gql`
  mutation(
		$id: ID!,
		$credit: Int,
	) {
		updateCredit(
			id: $id,
			credit: $credit
		) {
			id
		}
	}
`;

const UpdatePaid = gql`
  mutation(
		$id: ID!,
    $bountyPaid: Boolean
	) {
		UpdatePaid(
			id: $id,
			bountyPaid: $bountyPaid
		)
	}
`

module.exports = { AddQuestion, AddAnswer, AddUser, AddTransaction, UpdateCredit, UpdatePaid };
