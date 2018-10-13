import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import Autocomplete from 'react-autocomplete';
import { getUsernames, checkUsername } from '../../queries/queries.js';
import { Redirect } from 'react-router-dom';

class PrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '',
      receiverName: '',
      title: '',
      content: '',
      returnedId: null,
      redirect: false,
      users: [],
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
  }

  componentDidMount() {}

  replyFormat(receiverName) {
    this.setState({
      receiverName: receiverName,
    });
  }

  searchUsers(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.client
        .query({
          query: getUsernames,
          variables: {
            username: this.state.receiverName,
          },
        })
        .then(({ data }) => {
          if (data.getUsernames) {
            if (this.state.receiverName === '') {
              this.setState({ users: [] });
            } else {
              this.setState({ users: data.getUsernames });
            }
          }
        });
    });
  }

  submitForm(e) {
    e.preventDefault();
    let { title, content, receiverName } = this.state;
    if (!title || !content || !receiverName) {
      alert("Can't post an empty question!");
    } else {
      this.props.client
        .query({
          query: checkUsername,
          variables: {
            username: this.state.receiverName,
          },
        })
        .then(({ data }) => {
          if (data.checkUsername) {
            this.setState({ receiverId: data.checkUsername.id });
          }
        })
        .then(() => {
          if (this.state.receiverId) {
            this.props
              .mutate({
                mutation: AddMessage,
                variables: {
                  senderId: this.props.userId,
                  messageTitle: this.state.title,
                  messageContent: this.state.content,
                  receiverId: this.state.receiverId,
                },
              })
              .then(() => {
                this.setState({ redirect: true });
                alert('message sent');
              })
              .catch(err => console.log('error bro', err));
          } else {
            alert('Invalid User');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    const { title, content, receiverName } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/messages/sent" />;
    } else {
      return (
        <div>
          <h2>
            <u>PrivateMessage</u>
          </h2>
          <div>
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
                inputProps={{ placeholder: 'username', name: 'receiverName' }}
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
        </div>
      );
    }
  }
}

export default compose(
  withApollo,
  graphql(AddMessage),
)(PrivateMessage);
