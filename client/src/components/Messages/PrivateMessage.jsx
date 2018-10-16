import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { AddMessage } from '../../mutations/mutations.js';
import Autocomplete from 'react-autocomplete';
import { getUsernames, checkUsername } from '../../queries/queries.js';
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class PrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '',
      receiverName: '',
      title: '',
      content: '',
      users: [],
      show: true,
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.replyFormat = this.replyFormat.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  componentDidMount() {
    let { username } = this.props;
    if (username === 'none') {
      username = '';
    }
    this.setState({
      receiverName: username,
    });
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
    let { mutate, notify, userId } = this.props;
    this.setState({ show: true });
    if (!title || !content || !receiverName) {
      notify('error', "Can't post an empty message!");
    } else {
      if (receiverId) {
        mutate({
          mutation: AddMessage,
          variables: {
            senderId: userId,
            messageTitle: title,
            messageContent: content,
            receiverId: receiverId,
          },
        })
          .then(() => {
            notify('message', `Message Sent to ${receiverName} !`);
            this.setState({ show: false });
          })
          .catch(err => console.log('error bro', err));
      } else {
        notify('error', 'Invalid user');
      }
    }
  }

  render() {
    const { title, content, receiverName, users } = this.state;

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
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
                      style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                    >
                      {item.username}
                    </div>
                  )}
                  wrapperStyle={{ position: 'relative', display: 'inline-block' }}
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
            <Button onClick={this.handleClose}>Close</Button>
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
