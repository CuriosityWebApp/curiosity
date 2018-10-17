import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddTagsToFavorites, DeleteTagsFromFavorites } from '../../mutations/mutations.js';
import { Modal, Button } from 'react-bootstrap';

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      show: false,
    };
    this.addToFavorites = this.addToFavorites.bind(this);
    this.displayTags = this.displayTags.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  addToFavorites(e) {
    e.preventDefault();
    let { tag } = this.state;
    let tags = this.props.user.favoriteTags;
    if (tag.charAt(0) !== '#' || tags.includes(tag)) {
      this.props.notify(
        'error',
        'You have to put # in front of the tag name and it should not be duplicate!',
      );
    } else {
      this.props
        .AddTagsToFavorites({
          mutation: AddTagsToFavorites,
          variables: {
            userId: this.props.user.id,
            tag: this.state.tag,
          },
        })
        .then(() => {
          this.props.refetchTags();
        });
    }
  }

  removeTag(e, tag) {
    e.preventDefault();
    this.props
      .DeleteTagsFromFavorites({
        mutation: DeleteTagsFromFavorites,
        variables: {
          userId: this.props.user.id,
          tag: tag,
        },
      })
      .then(() => {
        this.props.refetchTags();
      });
  }

  displayTags() {
    let tags = this.props.user.favoriteTags;
    if (!tags) {
      return <div> No tags yet added</div>;
    } else {
      return tags.map((tag, i) => {
        return (
          <div key={tag}>
            <span className="badge badge-info " style={{ margin: '2px' }}>
              {tag}
            </span>
            <button
              type="button"
              className="btn btn-danger btn-xs"
              style={{ margin: '1px' }}
              onClick={e => this.removeTag(e, tag)}
            >
              x
            </button>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.handleShow} className="btn successBtn">
          <i className="fas fa-tags marigold" />
          <span className="textWhite"> Add Tags</span>
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Tags</Modal.Title>
          </Modal.Header>
          <div>
            <form>
              <label> Tag Name:</label>
              <input
                type="text"
                value={this.state.tag}
                onChange={e => this.setState({ tag: e.target.value })}
              />
              <button onClick={this.addToFavorites}>Add to favorites</button>
            </form>
            <div>
              <h3>Your favorite tags: </h3>
              <div>{this.displayTags()}</div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(AddTagsToFavorites, { name: 'AddTagsToFavorites' }),
  graphql(DeleteTagsFromFavorites, { name: 'DeleteTagsFromFavorites' }),
)(UserFavorites);

{
  /* <div>
  <button onClick={this.handleShow} className="btn btn-outline-primary">
    <small>Change Avatar</small>
  </button>

  <Modal show={this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Tags</Modal.Title>
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
          placeholder="Please paste img url!"
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
</div>; */
}
