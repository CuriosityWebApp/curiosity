import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import Autocomplete from 'react-autocomplete';
import { getUsernames, checkUsername } from '../../queries/queries.js';
import { withApollo } from 'react-apollo';
import InboxList from './InboxList.jsx';
import NewList from './NewList.jsx';
import SentList from './SentList.jsx';

class MessagesAndCreate extends Component {
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
      creator: false,
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.toggleCreator = this.toggleCreator.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
  }

  toggleCreator() {
    this.setState({
      creator: !this.state.creator,
      receiverName: '',
      title: '',
      content: '',
    });
  }

  replyFormat(receiverName, title, content) {
    this.setState({
      receiverName: receiverName,
      title: title,
      content: content,
    });
    this.setState({
      creator: true,
    });
    window.scrollTo(0, 0);
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
      this.props.notify('error', 'Please input all required fields.');
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
                this.props.notify('message', `Message Sent to ${this.state.receiverName} !`);
                this.toggleCreator();
              })
              .catch(err => console.log('error bro', err));
          } else {
            this.props.notify('error', 'Invalid user');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    const { title, content, receiverName } = this.state;
    return (
      <div>
        <h2>
          <u>{this.props.folder}</u>
        </h2>
        {this.state.creator && (
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
        )}
        <div>
          {this.state.creator ? (
            <button className="btn btn-info" onClick={this.toggleCreator}>
              Close
            </button>
          ) : (
            <button className="btn btn-info" onClick={this.toggleCreator}>
              Create
            </button>
          )}
        </div>
        {this.props.folder === 'unread' && (
          <NewList
            userId={this.props.userId}
            replyFormat={this.replyFormat}
            notify={this.props.notify}
          />
        )}
        {this.props.folder === 'inbox' && (
          <InboxList
            userId={this.props.userId}
            replyFormat={this.replyFormat}
            notify={this.props.notify}
          />
        )}
        {this.props.folder === 'sent' && (
          <SentList
            userId={this.props.userId}
            replyFormat={this.replyFormat}
            notify={this.props.notify}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(AddMessage),
)(MessagesAndCreate);
