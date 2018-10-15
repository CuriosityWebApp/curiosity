import React, { Component } from 'react';

class Vouches extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { vouch } = this.props;
    return (
      <div className="card bg-light mb-3">
        <div className="card-header bg-dark text-white">
          <i className="fas fa-users" /> Vouched By
        </div>
        <div
          className="card-body"
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          <div>
            {' '}
            {vouch.map((eachVouch, idx) => {
              return (
                <div key={idx}>
                  <div className="badge badge-info">{eachVouch}</div>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Vouches;
