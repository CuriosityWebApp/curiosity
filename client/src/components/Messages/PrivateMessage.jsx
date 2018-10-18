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
    let { mutate, notify, userId, client, refetch } = this.props;
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
                    notify('success', `Message Sent to ${receiverName} !`);
                    refetch();
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
      <div className="static-modal">
        <Modal dialogClassName="my-modal" show={showComponent} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send A Private Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: '#217CA3' }}>
                <i className="fas fa-envelope" />
                <span> Send a Message</span>
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Recipient *</label>
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
                                  cursor: 'pointer',
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
                              borderRadius: '0px',
                              border: '1px solid',
                              zIndex: '5000',
                              backgroundColor: 'white',
                            }}
                            value={receiverName}
                            onChange={this.searchUsers}
                            onSelect={value => this.selectUser(value)}
                            inputProps={{
                              type: 'text',
                              placeholder: 'Username',
                              name: 'receiverName',
                              className: 'form-control',
                            }}
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>Message Title *</label>
                          <input
                            name="title"
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={e => this.setState({ title: e.target.value })}
                            placeholder="Title"
                            style={{ display: 'inline' }}
                            required="required"
                            data-error="Message title is required."
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
                          <label>Message Content *</label>
                          <textarea
                            rows="6"
                            value={content}
                            className="form-control"
                            onChange={e => this.setState({ content: e.target.value })}
                            placeholder="Content"
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
                          value="Post Message"
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
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClose}>
              Close
            </Button>
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
