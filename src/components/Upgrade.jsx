import React, {Component} from 'react';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};

console.log (CLIENT);

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

class Upgrade extends Component {
  state = {};
  render () {
    const onSuccess = payment => console.log ('Successful payment!', payment);

    const onError = error =>
      console.log ('Erroneous payment OR failed to load script!', error);

    const onCancel = data => console.log ('Cancelled payment!', data);

    return (
      <React.Fragment>
        <div className="pd-top">
          <h1>Uprage to SMS-Reminder!</h1>
          <p>
            To be able to receive notifications via sms, upgrade to PREMIUM:
            <br />

            <span>* unlimited sms notifications for 25€ subscription</span>

          </p>
          <br />
          {/* <button type="button" className="btn btn-lg btn-light">
            Uprage my account
          </button> */}
        </div>
        <div>
          <PaypalButton
            client={CLIENT}
            env={ENV}
            commit={true}
            currency={'EUR'}
            total={100}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Upgrade;
