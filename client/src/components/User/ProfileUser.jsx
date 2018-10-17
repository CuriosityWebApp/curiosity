import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../../queries/queries.js';
import UserInfo from './UserInfo.jsx';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, notify } = this.props;
    let { loading, error, user, refetch } = data;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error...</div>;
    } else {
      return (
        <div>
          <div className="card">
            <div className="row">
              <div className="col">
                <div className="card shadow rounded">
                  <div className="card-header headerColor text-white leftAlign">
                    <i className="fa fa-home marigold" /> <strong>Home</strong>
                  </div>
                  <UserInfo user={user} refetch={refetch} notify={notify} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default graphql(getUser, {
  options: props => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(ProfileUser);

{
  /* <div className="card col-sm-4">
<div className="card-header bg-dark text-white">
  <i className="fa fa-question-circle" /> Questions
</div>
<UserQuestions questions={user.questions} />
<div
  className="card-body well well-sm pre-scrollable"
  style={{ maxHeight: '55vh' }}
/>
</div>
<br />
<div className="card col-sm-4">
<div className="card-header bg-dark text-white">
  <i className="fa fa-question-circle" /> Answers
</div>
<UserAnswers answers={user.answers} />
<div
  className="card-body well well-sm pre-scrollable"
  style={{ maxHeight: '55vh' }}
/>
</div> */
}

// <div>
//   <div className="container">
//     <div className="row">
//       <div className="col">
//         <div className="card">
//           <div className="card-header bg-dark text-white">
//             <i className="fas fa-trophy" />
//           </div>
//           <div className="card-body well well-sm pre-scrollable" style={{ maxHeight: '55vh' }}>
//             <div />
//           </div>
//         </div>
//         <br />
//         <div className="card">
//           <div className="card-header bg-dark text-white">
//             <i className="fa fa-question-circle" /> Questions
//           </div>
//           <div className="card-body well well-sm pre-scrollable" style={{ maxHeight: '55vh' }}>
//             <div>
//               {user.questions.map(question => {
//                 return (
//                   <ProfileQuestionList
//                     question={question}
//                     username={user.username}
//                     key={question.id}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-12 col-sm-4">
//         <div className="card bg-light mb-3">
//           <div className="card-header bg-dark text-white">
//             <i className="fa fa-user" /> User
//           </div>
//           <div
//             className="card-body"
//             style={{
//               display: 'block',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               textAlign: 'center',
//             }}
//           >
//             <img
//               src={user.avatarUrl}
//               className="rounded-circle"
//               style={{ width: '160px', height: '160px' }}
//             />
//             <div>{user.username}</div>
//             <div>Likes: {user.rank}</div>
//             <div>Member Since {moment(user.createdAt).format('LL')}</div>
//             <br />
//             <Link to={`/privatemessage/${user.username}`}>
//               <button type="button" className="btn btn-outline-primary">
//                 Send Message
//               </button>
//             </Link>
//             <br />
//             <div>
//               <button
//                 style={{
//                   margin: '20px',
//                 }}
//                 type="button"
//                 className="btn btn-outline-primary"
//                 value={user.vouch.includes(username) ? 'Nevermind' : 'Vouch This Person!!'}
//                 onClick={this.onClickAddVouch}
//               >
//                 {user.vouch.includes(username) ? 'Nevermind' : 'Vouch This Person!!'}
//               </button>
//             </div>
//           </div>
//         </div>
//         <Vouches vouch={user.vouch} />
//       </div>
//     </div>
//   </div>
// </div>;
