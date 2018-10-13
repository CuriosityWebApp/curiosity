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
        <div className="card-header bg-success text-white">
          <i className="fa fa-user" /> Vouched By
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
          <div>{vouch}</div>
        </div>
      </div>
    );
  }
}

export default Vouches;
