import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PaymentCheckOut from './PaymentCheckOut.jsx';

class BuyCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this.onClickShowComponent = this.onClickShowComponent.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onClickShowComponent() {
    this.setState({
      showComponent: true,
    });
  }

  handleClose() {
    this.setState({ showComponent: false });
  }

  render() {
    let { id, data, refetcher, notify } = this.props;
    return (
      <StripeProvider apiKey={process.env.stripe_public_key}>
        <div>
          <Elements>
            <div>
              <strong>Buy Credit</strong>
              <img
                onClick={this.onClickShowComponent}
                src="https://d1g8y79pdob38v.cloudfront.net/media/catalog/product/p/a/payment-logo_1.png"
                style={{ width: '200px' }}
              />
              {this.state.showComponent ? (
                <PaymentCheckOut
                  id={id}
                  data={data}
                  showComponent={this.state.showComponent}
                  handleClose={this.handleClose}
                  refetcher={refetcher}
                  notify={notify}
                />
              ) : null}
            </div>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default BuyCredit;
