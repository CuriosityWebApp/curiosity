import { gql } from 'apollo-boost';

const getUser = gql`
	query($id: ID!) {
		user(id: $id) {
			id
			username
			rank
			credit
			questions {
				id
				title
				bounty
			}
			answers {
				id
				answer
				score
			}
			transactions {
				id
				questionId
				amount
				recipient
			}
		}
	}
`;

const getQuestion = gql`
	query($id: ID!) {
		question(id: $id) {
			questionTitle
			questionContent
			category
			bounty
			restriction
			tags
			user {
				username
				rank
			}
			answers {
				id
			}
			createdAt
		}
	}
`;

// passing in the questionId
const getAnswer = gql`
	query($id: ID!) {
		answer(id: $id) {
			answer
			score
			createdAt
			user {
				username
				rank
			}
		}
	}
`;

const getQuestions = gql`
	query {
		questions {
			id
			category
			questionTitle
			questionContent
			user {
				username
			}
			bounty
			restriction
			tags
			createdAt
			answers {
				id
			}
		}
	}
`;
const checkUserEmail = gql`
	query($email: String!) {
		checkUserEmail(email: $email) {
			id
			username
			email
		}
	}
`;

module.exports = {
  getUser,
  getQuestion,
  getQuestions,
  getAnswer,
  checkUserEmail,
};
