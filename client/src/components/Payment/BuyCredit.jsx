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
    let { id, data, refetch, notify } = this.props;
    return (
      <StripeProvider apiKey={process.env.stripe_public_key}>
        <div>
          <Elements>
            <div>
              <strong>Buy</strong>
              <img
                onClick={this.onClickShowComponent}
                src="https://png.icons8.com/windows/1600/stripe.png"
                style={{ width: '150px', cursor: 'pointer' }}
              />
              {this.state.showComponent ? (
                <PaymentCheckOut
                  id={id}
                  data={data}
                  showComponent={this.state.showComponent}
                  handleClose={this.handleClose}
                  refetch={refetch}
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
