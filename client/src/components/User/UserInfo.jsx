import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UpdateUserAvatar from './UpdateUserAvatar.jsx';
import UserWallet from './UserWallet.jsx';
import UserFavorites from './UserFavorites.jsx';
import moment from 'moment';
import { DeleteTagsFromFavorites } from '../../mutations/mutations.js';
import { graphql, compose } from 'react-apollo';

class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  removeTag = (e, tag) => {
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
        this.props.refetch();
      });
  };

  render() {
    let { user, refetch, notify, data } = this.props;
    let counter = 0;
    user.answers.map(answer => {
      if (answer.answerChosen) {
        counter++;
      }
    });
    return (
      <div>
        <div
          className="row"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          <div
            className="col-12 col-sm-3"
            style={{
              marginTop: '30px',
            }}
          >
            <img
              src={user.avatarUrl}
              className="rounded-circle"
              style={{ width: '160px', height: '160px' }}
            />
            <br />
            <div className="basicMargin">
              <UpdateUserAvatar id={user.id} refetch={refetch} notify={notify} />
            </div>
            <hr />
            <strong>{user.username}</strong>
            <div style={{ marginBottom: '20px' }}>
              <em>Member since </em>
              {moment(user.createdAt).format('LL')}
            </div>
            <hr />
            <div style={{ fontFamily: 'Impact', marginTop: '20px' }}>My Favorite Tags</div>
            <div>
              {user.favoriteTags.map((tag, i) => {
                return (
                  <span className="badge headerColor textWhite" key={i} style={{ margin: '2px' }}>
                    {tag}{' '}
                    <i
                      onClick={e => this.removeTag(e, tag)}
                      style={{ cursor: 'pointer', color: '#F7CE3E' }}
                      className="fas fa-times "
                    />
                  </span>
                );
              })}
              <hr style={{ marginTop: '20px' }} />
            </div>
            <div className="basicMargin">
              <UserFavorites user={user} refetchTags={refetch} notify={notify} />
            </div>
          </div>
          <div className="col-12 col-sm-9">
            <UserWallet user={user} data={data} refetch={refetch} notify={notify} />
          </div>
        </div>
        <div className="row" style={{ marginLeft: '65px', marginRight: '65px', marginTop: '30px' }}>
          <div className="col-12 col-sm-3">
            <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div className="card mb-3 successBtn">
                <div
                  className="card-body"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <i className="fas fa-question marigold" />
                  <span className="textWhite"> Questions {user.questions.length}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-sm-3">
            <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div className="card mb-3 successBtn">
                {' '}
                <div
                  className="card-body"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <i className="far fa-comment-dots marigold" />
                  <span className="textWhite"> Answers {user.answers.length}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-sm-3">
            <Link to={`user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div className="card mb-3 successBtn">
                {' '}
                <div
                  className="card-body"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <i className="fas fa-crown marigold" />
                  <span className="textWhite"> Best Answers {counter}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-sm-3">
            <div className="card mb-3 successBtn">
              {' '}
              <div
                className="card-body"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  textAlign: 'center',
                }}
              >
                <i className="fas fa-award marigold" />
                <span className="textWhite"> Experience {user.rank}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(graphql(DeleteTagsFromFavorites, { name: 'DeleteTagsFromFavorites' }))(
  UserInfo,
);
