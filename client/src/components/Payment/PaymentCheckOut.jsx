import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import { Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import { UpdateCredit } from '../../mutations/mutations.js';

class PaymentCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usd: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handlePayment(UpdateCredit) {
    UpdateCredit({ variables: { id: this.props.id, credit: 5000 } });
    console.log('Credit Received!');
  }

  async submit(UpdateCredit) {
    let token = await this.props.stripe.createToken({ name: this.props.username });

    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token,
    });
    if (response.ok) {
      console.log('Purchase Complete!');
      this.handlePayment(UpdateCredit);
    }
  }

  render() {
    console.log('stripe', this.props.stripe);
    const tooltipOneDollar = (
      <Tooltip id="modal-tooltip">
        <em>0 bonus credit</em>
      </Tooltip>
    );
    const tooltipFiveDollar = (
      <Tooltip id="modal-tooltip">
        <em>50 bonus credit</em>
      </Tooltip>
    );
    const tooltipTenDollar = (
      <Tooltip id="modal-tooltip">
        <em>150 bonus credit</em>
      </Tooltip>
    );
    const tooltipTwentyDollar = (
      <Tooltip id="modal-tooltip">
        <em>450 bonus credit</em>
      </Tooltip>
    );
    const tooltipFiftyDollar = (
      <Tooltip id="modal-tooltip">
        <em>1500 bonus credit</em>
      </Tooltip>
    );
    const tooltipHundredDollar = (
      <Tooltip id="modal-tooltip">
        <em>4000 bonus credit</em>
      </Tooltip>
    );
    return (
      <Mutation mutation={UpdateCredit}>
        {(UpdateCredit, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          return (
            <div>
              <Modal show={this.props.showComponent} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Limited Offer</h4>
                  <p>
                    <em>
                      <b>100</b>{' '}
                      <OverlayTrigger overlay={tooltipOneDollar}>
                        <a href="#tooltipOneDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>1</b> usd
                    </em>
                    <br />
                    <em>
                      <b>550</b>{' '}
                      <OverlayTrigger overlay={tooltipFiveDollar}>
                        <a href="#tooltipFiveDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>5</b> usd
                    </em>
                    <br />
                    <em>
                      <b>1150</b>{' '}
                      <OverlayTrigger overlay={tooltipTenDollar}>
                        <a href="#tooltipTenDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>10</b> usd
                    </em>
                    <br />
                    <em>
                      <b>2450</b>{' '}
                      <OverlayTrigger overlay={tooltipTwentyDollar}>
                        <a href="#tooltipTwentyDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>20</b> usd
                    </em>
                    <br />
                    <em>
                      <b>6500</b>{' '}
                      <OverlayTrigger overlay={tooltipFiftyDollar}>
                        <a href="#tooltipFiftyDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>50</b> usd
                    </em>
                    <br />
                    <em>
                      <b>14000</b>{' '}
                      <OverlayTrigger overlay={tooltipHundredDollar}>
                        <a href="#tooltipHundredDollar">credit</a>
                      </OverlayTrigger>{' '}
                      for <b>100</b> usd
                    </em>
                    <br />
                  </p>

                  <hr />

                  <img
                    src="http://www.pngmart.com/files/3/Major-Credit-Card-Logo-PNG-Clipart.png"
                    style={{ width: '450px', height: '80px' }}
                  />

                  <hr />

                  <div>
                    <p>Would you like to complete the purchase?</p>
                    <input
                      className="create-input"
                      type="text"
                      placeholder="usd"
                      name="usd"
                      onChange={this.handleChange}
                    />
                    <small>
                      <em> You will receive 0 credits!</em>
                    </small>
                  </div>

                  <hr />

                  <div className="checkout">
                    <p>Would you like to complete the purchase?</p>
                    <form
                      onClick={() => {
                        this.submit(UpdateCredit);
                        this.props.handleClose;
                      }}
                      onSubmit={() => {
                        this.submit(UpdateCredit);
                        this.props.handleClose;
                      }}
                    >
                      <div className="card-field">
                        <CardElement />
                        <br />
                      </div>
                      <Button>Confirm Order</Button>
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default injectStripe(PaymentCheckOut);

<div className="checkout">
  <p>Would you like to complete the purchase?</p>
  <form
    onClick={() => this.submit(UpdateCredit)}
    onSubmit={() => {
      this.submit(UpdateCredit);
    }}
  >
    <div className="card-field">
      <CardElement />
    </div>
    <Button>Confirm Order</Button>
  </form>
</div>;
