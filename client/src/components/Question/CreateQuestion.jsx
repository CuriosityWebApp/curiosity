import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddQuestion, UpdateCredit } from '../../mutations/mutations.js';
import { Redirect } from 'react-router-dom';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      content: undefined,
      bounty: 0,
      category: undefined,
      restriction: undefined,
      tags: undefined,
      returnedId: null,
      redirect: false,
    };
    this.displayCategories = this.displayCategories.bind(this);
  }

  displayCategories() {
    let categories = ['Biology', 'Technology', 'History', 'Chemistry', 'Politics', 'Economy'];

    return categories.map(category => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  }

  submitForm(e) {
    e.preventDefault();
    let { title, content, restriction } = this.state;
    let splittedTags = this.state.tags;
    console.log(this.state.bounty, 'bounty', this.props.credit, 'credits');
    if (this.state.tags) {
      splittedTags = this.state.tags.split(' ');
    }

    if (!title || !content || !restriction) {
      this.props.notify('error', "Can't post an empty question!");
    } else if (this.props.credit < Number(this.state.bounty)) {
      this.props.notify('error', 'You have insufficient credit!');
    } else {
      this.props
        .AddQuestion({
          mutation: AddQuestion,
          variables: {
            userId: this.props.userId,
            questionTitle: this.state.title,
            questionContent: this.state.content,
            bounty: Number(this.state.bounty),
            category: this.state.category,
            restriction: Number(this.state.restriction),
            tags: splittedTags,
          },
        })
        .then(data => {
          console.log('THIS IS CREATE QUESTION', data.data.addQuestion.id);
          this.setState({ returnedId: data.data.addQuestion.id }, () => {
            this.setState({ redirect: true }, () => {
              this.setState({ redirect: false });
            });
          });
        })
        .then(data => {
          this.props
            .UpdateCredit({
              mutation: UpdateCredit,
              variables: {
                id: this.props.userId,
                credit: Number(this.state.bounty * -1),
              },
            })
            .then(() => {
              this.props.notify('transaction', 'Question Created!');
            });
        })
        .catch(err => console.log('error bro', err));
    }
  }

  render() {
    const { title, content, bounty, category, restriction, tags, redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/questionContent/${this.state.returnedId}`} />;
    } else {
      return (
        <div>
          <h4>Ask Question</h4>
          <form id="contact-form" method="post" action="contact.php" role="form">
            <div className="messages" />

            <div className="controls">
              <div className="row">
                <div className="col-md-1">
                  <div className="form-group">
                    <label>Bounty *</label>
                    <input
                      type="number"
                      value={bounty}
                      className="form-control"
                      required="required"
                      onChange={e => this.setState({ bounty: e.target.value })}
                      data-error="Bounty is required"
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="form-group">
                    <label>Rank *</label>
                    <input
                      type="text"
                      value={restriction}
                      onChange={e => this.setState({ restriction: e.target.value })}
                      className="form-control"
                      required="required"
                      data-error="Rank is required"
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      onChange={e => this.setState({ category: e.target.value })}
                      id="form_need"
                      name="need"
                      className="form-control"
                      required="required"
                      data-error="Please specify your category."
                    >
                      <option>Select Category</option>
                      {this.displayCategories()}
                    </select>
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Tags</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={e => this.setState({ tags: e.target.value })}
                      className="form-control"
                      placeholder="Ex. #Biology"
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Question Title *</label>
                    <input
                      value={title}
                      onChange={e => this.setState({ title: e.target.value })}
                      type="text"
                      className="form-control"
                      placeholder="Please enter your Question title!"
                      required="required"
                      data-error="Question title is required."
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <div className="help-block with-errors" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Question Content *</label>
                    <textarea
                      value={content}
                      onChange={e => this.setState({ content: e.target.value })}
                      className="form-control"
                      placeholder="Please enter your Question content!"
                      rows="6"
                      required="required"
                      data-error="Question content is required"
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-md-12">
                  <input
                    type="submit"
                    onClick={this.submitForm.bind(this)}
                    className="btn btn-success btn-send"
                    value="Post Question"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="text-muted">
                    <strong>*</strong> These fields are required.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default compose(
  graphql(AddQuestion, { name: 'AddQuestion' }),
  graphql(UpdateCredit, { name: 'UpdateCredit' }),
)(CreateQuestion);
