import React, {Component} from "react";
import { getAnswer } from '../../queries/queries.js';
import { graphql } from 'react-apollo';
import moment from 'moment';

class ChosenAnswer extends Component {
  constructor(props) {
    super(props)
  }

  displayChosenAnswer() {
    let {data} = this.props
    console.log("I AM FROM CHOSENONE", data.answer)

    if (data && data.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div className="list-group">
					<div className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="row">
							<div className="col-1">
								<div className="row" style={{ textAlign: 'right' }}>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-up"
											aria-hidden="true"
											style={{ color: 'green', cursor: 'pointer' }}
											value={1}
											// onClick={this.UpdateLikes}
										/>
									</div>
									<div className="col align-self-start">{data.answer.score}</div>
									<div className="col align-self-start">
										<button
											className="fa fa-caret-down"
											aria-hidden="true"
											style={{ color: 'red', cursor: 'pointer' }}
											value={-1}
											// onClick={this.UpdateLikes}
										/>
									</div>
								</div>
							</div>
							<div className="col-11">
								<div className="d-flex w-100 justify-content-between">
									<div>
										<small>
											Answer By {data.answer.user.username}{' '}
											{moment(data.answer.createdAt).fromNow()}
										</small>
                    <br/>
                    <small>Best Answer</small>
									</div>
									<div>
										<small>Rank: {data.answer.user.rank}</small> <br />
										<small>Votes: {data.answer.score}</small>
									</div>
								</div>
								<br />
								<div className="answerContent">
									<p>{data.answer.answer}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
      )
    }
  }

  render() {
    return <div>{this.displayChosenAnswer()}</div>;
  }
}



export default graphql(getAnswer, {
	options: props => {
		return {
			variables: {
				id: props.id
			}
		};
	}
})(ChosenAnswer);