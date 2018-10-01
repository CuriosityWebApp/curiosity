import gql from 'apollo-boost';

const GetUser = gql`
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

const GetQuestion = gql`
	query($id: ID!) {
		question(id: $id) {
			title
			question
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
				answer
				score
				user {
					username
					rank
				}
			}
			createdAt
		}
	}
`;

// const getAnswer = gql`
// 	query($id: ID!) {
// 		answer(id: $id) {
// 			answer
// 			score
// 			user {
// 				username
// 				rank
// 			}
// 		}
// 	}
// `;

const GetQuestions = gql`
	{
		questions {
			id
			title
			category
			question
			user {
				username
			}
			bounty
			restriction
			tags
			createdAt
		}
	}
`;

module.exports = { GetUser, GetQuestion, GetQuestions };
