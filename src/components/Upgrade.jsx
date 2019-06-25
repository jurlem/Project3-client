import React, {Component} from 'react';
import axios from 'axios';
import {MyContext} from './ReactContext';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};
// console.log (CLIENT);

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

class Upgrade extends Component {
  state = {};

  onUpgrade = () => {
    const id = this.context.state.userId;

    axios
      .get (`http://localhost:6001/manage/upgrade?id=${id}`)
      .then (result => {
        console.log ('LOGGING GET from manage/upgrade ', result.data);
        //the method to update state in context:
        this.context.updatePremiumState ();
      })
      .catch (err => {
        console.log (err);
      });
  };

  render () {
    // const onSuccess = payment => console.log ('Successful payment!', payment);
    // const onError = error =>
    //   console.log ('Erroneous payment OR failed to load script!', error);
    // const onCancel = data => console.log ('Cancelled payment!', data);

    return (
      <React.Fragment>
        <div className="pd-top">

          {this.context.state.premium === 'false'
            ? <React.Fragment>
                <h1>Uprage to SMS-Reminder!</h1>
                <p>
                  To be able to receive notifications via sms, upgrade to PREMIUM:
                  <br />

                  <span>
                    * unlimited sms notifications for 25€ subscription
                  </span>

                </p>
                <br />

                {' '}
                <button
                  onClick={this.onUpgrade}
                  type="button"
                  className="btn btn-lg btn-primary"
                >
                  Uprage my account
                </button>
                <div>
                  {/* <PaypalButton
                    // client={CLIENT}
                    // env={ENV}
                    // commit={true}
                    // currency={'EUR'}
                    // total={100}
                    // onSuccess={onSuccess}
                    // onError={onError}
                    // onCancel={onCancel}
                    onClick={this.onUpgrade}
                  /> */}
                </div>
              </React.Fragment>
            : <p>You have activated SMS Notification for monthly fee</p>}

        </div>
      </React.Fragment>
    );
  }
}

Upgrade.contextType = MyContext;

export default Upgrade;
