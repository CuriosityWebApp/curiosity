import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { AddTagsToFavorites, DeleteTagsFromFavorites } from '../../mutations/mutations.js';

class UserFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
    this.addToFavorites = this.addToFavorites.bind(this);
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

  render() {
    return (
      <div>
        <div
          style={{
            margin: '0px 40px 40px 40px',
          }}
        >
          <form id="contact-form" method="post" action="contact.php" role="form">
            <div className="messages" />

            <div className="controls">
              <div className="row">
                <div className="form-group">
                  <span>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.tag}
                      placeholder="Ex. #Biology"
                      onChange={e => this.setState({ tag: e.target.value })}
                    />
                    <br />
                    <button onClick={this.addToFavorites} className="btn successBtn">
                      <i className="fas fa-tags marigold" />
                      <span className="textWhite"> Add tag</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(AddTagsToFavorites, { name: 'AddTagsToFavorites' }),
  graphql(DeleteTagsFromFavorites, { name: 'DeleteTagsFromFavorites' }),
)(UserFavorites);
