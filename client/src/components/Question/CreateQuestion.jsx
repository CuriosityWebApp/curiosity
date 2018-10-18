import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddQuestion, UpdateCredit } from '../../mutations/mutations.js';
import { Redirect } from 'react-router-dom';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      bounty: 0,
      category: '',
      restriction: 0,
      tags: '',
      returnedId: null,
      redirect: false,
    };
    this.displayCategories = this.displayCategories.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.changeState = this.changeState.bind(this);
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
  changeState(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    let { title, content, restriction, tags, bounty, category } = this.state;
    let { credit, notify, userId } = this.props;
    let splittedTags = tags;
    if (tags) {
      splittedTags = tags.split(' ');
    } else {
      splittedTags = [];
    }
    if (!title || !content) {
      notify('error', "Can't post an empty question!");
    } else if (credit < Number(bounty)) {
      notify('error', 'You have insufficient credit!');
    } else if (splittedTags.every(tag => tag.charAt(0) === '#') === false) {
      notify('error', "Can't use tags without # in front!");
    } else {
      this.props
        .AddQuestion({
          mutation: AddQuestion,
          variables: {
            userId: userId,
            questionTitle: title,
            questionContent: content,
            bounty: Number(bounty),
            category: category,
            restriction: Number(restriction),
            tags: splittedTags,
          },
        })
        .then(({ data }) => {
          this.setState({ returnedId: data.addQuestion.id }, () => {
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
                id: userId,
                credit: Number(bounty * -1),
              },
            })
            .then(() => {
              notify('success', 'Question Created!');
            });
        })
        .catch(err => console.log('error bro', err));
    }
  }

  render() {
    const {
      title,
      content,
      bounty,
      category,
      restriction,
      tags,
      redirect,
      returnedId,
    } = this.state;
    if (redirect) {
      return <Redirect to={`/questionContent/${returnedId}`} />;
    } else {
      return (
        <div className="card">
          <div className="card-header text-white" style={{ backgroundColor: '#217CA3' }}>
            <i className="fa fa-question-circle" />
            <span> Ask Question</span>
          </div>
          <div
            style={{
              margin: '40px 40px 40px 40px',
            }}
          >
            <form id="contact-form" method="post" action="contact.php" role="form">
              <div className="messages" />

              <div className="controls">
                <div className="row">
                  <div className="col-md-1">
                    <div className="form-group">
                      <label>Bounty *</label>
                      <input
                        type="text"
                        name="bounty"
                        placeholder="0"
                        value={bounty}
                        className="form-control"
                        required="required"
                        onChange={this.changeState}
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
                        name="restriction"
                        placeholder="0"
                        value={restriction}
                        onChange={this.changeState}
                        className="form-control"
                        data-error="Rank is required"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        onChange={this.changeState}
                        id="form_need"
                        name="category"
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
                        name="tags"
                        value={tags}
                        onChange={this.changeState}
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
                        onChange={this.changeState}
                        name="title"
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
                        name="content"
                        onChange={this.changeState}
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
                      onClick={this.submitForm}
                      className="btn btn-send"
                      value="Post Question"
                      style={{ backgroundColor: '#217CA3', color: 'white' }}
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
        </div>
      );
    }
  }
}

export default compose(
  graphql(AddQuestion, { name: 'AddQuestion' }),
  graphql(UpdateCredit, { name: 'UpdateCredit' }),
)(CreateQuestion);
