import { gql } from 'apollo-boost';

const getUser = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      rank
      credit
      email
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

const checkUserEmail = gql`
  query($email: String!) {
    checkUserEmail(email: $email) {
      id
      username
      email
    }
  }
`;

const getQuestion = gql`
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
      answers {
        user {
          username
          rank
        }
        answer
        createdAt
      }
      createdAt
    }
  }
`;

module.exports = {
  getUser,
  checkUserEmail,
  getQuestion,
  getQuestions,
};
