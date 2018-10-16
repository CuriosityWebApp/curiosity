import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import Autocomplete from 'react-autocomplete';
import { getUsernames, checkUsername } from '../../queries/queries.js';
import { Modal, Button } from 'react-bootstrap';

class PrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '',
      receiverName: '',
      title: '',
      content: '',
      users: [],
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
  }

  componentDidMount() {
    let { receiverName, title, content } = this.props;
    if (receiverName) {
      this.setState({
        receiverName: receiverName,
      });
    }
    if (title) {
      this.setState({
        title: title,
      });
    }
    if (content) {
      this.setState({
        content: content,
      });
    }
  }

  replyFormat(receiverName) {
    this.setState({
      receiverName: receiverName,
    });
  }
  selectUser(value) {
    this.setState({ receiverName: value }, () => {
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
          } else {
            this.setState({ receiverId: '' });
          }
        })
        .catch(err => console.error(err));
    });
  }

  searchUsers(e) {
    let { client } = this.props;
    this.setState({ receiverName: e.target.value }, () => {
      client
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
        })
        .catch(err => console.error(err));

      client
        .query({
          query: checkUsername,
          variables: {
            username: this.state.receiverName,
          },
        })
        .then(({ data }) => {
          if (data.checkUsername) {
            this.setState({ receiverId: data.checkUsername.id });
          } else {
            this.setState({ receiverId: '' });
          }
        })
        .catch(err => console.error(err));
    });
  }

  submitForm(e) {
    e.preventDefault();
    let { title, content, receiverName, receiverId } = this.state;
    let { mutate, notify, userId, client } = this.props;
    this.setState({ show: true });
    if (!title || !content || !receiverName) {
      notify('error', "Can't post an empty message!");
    } else {
      client
        .query({
          query: checkUsername,
          variables: {
            username: receiverName,
          },
        })
        .then(({ data }) => {
          if (data.checkUsername) {
            this.setState({ receiverId: data.checkUsername.id }, () => {
              if (this.state.receiverId) {
                mutate({
                  mutation: AddMessage,
                  variables: {
                    senderId: userId,
                    messageTitle: title,
                    messageContent: content,
                    receiverId: this.state.receiverId,
                  },
                })
                  .then(() => {
                    notify('message', `Message Sent to ${receiverName} !`);
                    this.props.handleClose();
                  })
                  .catch(err => console.log('error bro', err));
              } else {
                notify('error', 'Invalid user');
              }
            });
          } else {
            this.setState({ receiverId: '' });
            notify('error', 'Invalid user');
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { title, content, receiverName, users } = this.state;
    let { handleClose, showComponent } = this.props;
    return (
      <div>
        <Modal show={showComponent} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send A Private Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={this.submitForm.bind(this)}>
                <Autocomplete
                  items={users}
                  shouldItemRender={(item, value) =>
                    item.username.toLowerCase().indexOf(value.toLowerCase()) > -1
                  }
                  getItemValue={item => item.username}
                  renderItem={(item, highlighted) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: highlighted ? '#eee' : 'transparent',
                      }}
                    >
                      {item.username}
                    </div>
                  )}
                  wrapperStyle={{
                    position: 'relative',
                  }}
                  menuStyle={{
                    top: 35,
                    left: 0,
                    position: 'absolute',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '90%',
                  }}
                  value={receiverName}
                  onChange={this.searchUsers}
                  onSelect={value => this.selectUser(value)}
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(AddMessage),
)(PrivateMessage);
