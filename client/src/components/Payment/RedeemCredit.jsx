import React, { Component } from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

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
        <strong>Redeem Credit</strong>

        <img
          src="https://d1g8y79pdob38v.cloudfront.net/media/catalog/product/p/a/payment-logo_1.png"
          style={{ width: '200px' }}
          onClick={this.handleShow}
        />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction</Modal.Title>
          </Modal.Header>
          <hr />
          <img
            src="https://uiowa.edu/university-shared-services/sites/uiowa.edu.university-shared-services/files/styles/large/public/Bank.png?itok=KBY-4Kak"
            style={{ width: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
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
            <Button onClick={this.handleClose}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RedeemCredit;
