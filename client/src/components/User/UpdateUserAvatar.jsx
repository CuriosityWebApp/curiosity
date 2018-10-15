import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { UpdateUserAvatar } from '../../mutations/mutations.js';

class ChooseUserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUrl = this.handleSubmitUrl.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmitUrl() {
    this.props
      .mutate({
        mutation: UpdateUserAvatar,
        variables: {
          id: this.props.id,
          avatarUrl: this.state.avatarUrl,
        },
      })
      .then(() => {
        this.props.notify('message', 'Avatar Updated!');
        this.props.refetch();
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleShow} className="btn btn-outline-primary">
          Change Avatar
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Your Avatar</Modal.Title>
          </Modal.Header>
          <hr />
          <img
            src={this.state.avatarUrl}
            alt="Your picture here!"
            className="rounded-circle"
            style={{
              width: '200px',
              height: '200px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <Modal.Body>
            <hr />
            <p style={{ textAlign: 'center' }}>Place Your Url here!</p>
            <form>
              <input
                type="text"
                placeholder="url goes here"
                onChange={this.handleChange}
                name="avatarUrl"
                className="form-control"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleClose();
                this.handleSubmitUrl();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default graphql(UpdateUserAvatar)(ChooseUserAvatar);
