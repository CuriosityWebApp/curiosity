import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RedeemCredit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <strong>Redeem</strong>

        <img
          src="https://png.icons8.com/windows/1600/stripe.png"
          style={{ width: '150px', cursor: 'pointer' }}
          onClick={this.handleShow}
          alt="redeemCredit"
        />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction</Modal.Title>
          </Modal.Header>
          <hr />
          <img
            src="https://uiowa.edu/university-shared-services/sites/uiowa.edu.university-shared-services/files/styles/large/public/Bank.png?itok=KBY-4Kak"
            style={{ width: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            alt="BankExample"
          />
          <hr />
          <Modal.Body>
            <h4>Bank Information</h4>
            <p>Name of Bank</p>
            <input className="form-control" />
            <br />
            <p>Routing Number</p>
            <input className="form-control" />
            <br />
            <p>Account Number</p>
            <input className="form-control" />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: '#217CA3', color: 'white' }}
              onClick={this.handleClose}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RedeemCredit;
