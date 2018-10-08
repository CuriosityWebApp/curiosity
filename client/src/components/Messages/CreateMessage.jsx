import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '5bb28b0d1723602d90864b70',
      receiverName: '',
      title: '',
      content: '',
      returnedId: null,
      redirect: false,
      users: [{ id: '555', username: 'justin' }],
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  searchUsers(e) {
    this.setState({ receiverName: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    let { title, content, receiverId } = this.state;
    if (!title || !content || !receiverId) {
      alert("Can't post an empty question!");
    } else {
      this.props
        .AddMessage({
          mutation: AddMessage,
          variables: {
            senderId: this.props.userId,
            messageTitle: this.state.title,
            messageContent: this.state.content,
            receiverId: this.state.receiverId,
          },
        })
        .then(data => {
          console.log(data);
          // this.setState({ returnedId: data.data.addQuestion.id }, () => {
          //   this.setState({ redirect: true }, () => {
          //     this.setState({ redirect: false });
          //   });
          // });
        })
        .catch(err => console.log('error bro', err));
    }
  }

  render() {
    const { title, content, receiverName, redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/questionContent/${this.state.returnedId}`} />;
    } else {
      return (
        <div>
          <h4>Send a message </h4>
          <form onSubmit={this.submitForm.bind(this)}>
            <Autocomplete
              items={this.state.users}
              shouldItemRender={(item, value) =>
                item.username.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={item => item.username}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                >
                  {item.username}
                </div>
              )}
              wrapperStyle={{ position: 'relative', display: 'inline-block' }}
              value={receiverName}
              onChange={this.searchUsers}
              onSelect={value => this.setState({ receiverName: value })}
              inputProps={{ placeholder: 'recipient username' }}
            />
            <br />
            <input
              type="text"
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="title"
              style={{ display: 'inline' }}
            />
            <br />
            <div>
              <textarea
                rows="5"
                cols="60"
                value={content}
                onChange={e => this.setState({ content: e.target.value })}
                placeholder="message"
              />
            </div>
          </form>
          <button onClick={this.submitForm.bind(this)}>Send Message</button>
        </div>
      );
    }
  }
}

export default graphql(AddMessage, { name: 'AddMessage' })(CreateMessage);
