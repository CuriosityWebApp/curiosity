import { gql } from 'apollo-boost';

const AddQuestion = gql`
	mutation(
		$userId: ID!
		$title: String!
		$question: String!
		$category: String
		$bounty: Int!
		$restriction: Int!
		$tags: [String]
	) {
		addQuestion(
			userId: $userId
			title: $title
			question: $question
			category: $category
			bounty: $bounty
			restrition: $restriction
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
	mutation($username: String!) {
		addUser(username: $username) {
			id
			username
			rank
			credit
		}
	}
`;

module.exports = { AddQuestion, AddAnswer, AddUser };
