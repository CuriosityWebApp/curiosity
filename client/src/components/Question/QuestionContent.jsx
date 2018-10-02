import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getQuestion } from '../../queries/queries.js'

class QuestionContent extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Query
				query={getQuestion}
				variables= {{id: this.props.id}}
			>
			{({ loading, error, data }) => {
			  if ( loading ) { return <p>Loading...</p>; }
				if ( error ) { return <p>Error! ${ error }</p>; }
				else {
					console.log("this is from the content", data)
			  	return (
						<div>
						  <div>{data.question.questionTitle}</div>
						  <div>{data.question.questionContent}</div>
						  <div>{data.question.category}</div>
						  <div>{data.question.bounty}</div>
						  <div>
						  	{
						  		data.question.answers.map(answer => {
                    return <div key={answer.id}>{answer.answer}</div>
						  		})
						  	}
						  </div>
						</div>
					)
			  }
		  }}
			</Query>
		)
	}
}

export default QuestionContent;

// question:
// answers: (2) [{…}, {…}]
// bounty: 350
// category: "psychology"
// createdAt: "2018-10-01T21:05:39.844Z"
// questionContent: "Please explain what classical conditioning is and give me multiple examples of it."
// questionTitle: "What is classical conditioning?"
// restriction: 0
// tags: (2) ["Pavlov", "Psychology"]
// user: {username: "Jay", rank: 0, __typename: "User"}
// __typename: "Question"
// __proto__: Object