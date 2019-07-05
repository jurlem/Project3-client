import React, {Component} from 'react';
import axios from 'axios';
import {MyContext} from './ReactContext';
import PaypalButton from './PaypalButton';

class Upgrade extends Component {
  state = {};

  componentDidMount () {
    console.log ('logging premium UPGRADE', this.context.state.premium);
  }

  onUpgrade = () => {
    const id = this.context.state.userId;

    axios
      .get (`http://localhost:6001/manage/upgrade?id=${id}`)
      .then (result => {
        console.log ('logging premium UPGRADE', this.context.state.premium);

        console.log ('LOGGING GET from manage/upgrade ', result.data);
        //the method to update state in context:
        this.context.updatePremiumState ();
      })
      .catch (err => {
        console.log (err);
      });
  };

  render () {
    const premium = this.context.state.premium
      ? this.context.state.premium
      : localStorage.getItem ('premium');
    console.log ('premium in render()', this.context.state.premium);
    return (
      <React.Fragment>
        <div className="pd-top">

          {premium === 'Yes'
            ? <p>You have activated SMS Notification for monthly fee</p>
            : <React.Fragment>
                <h1>Upgrade to SMS-Reminder!</h1>
                <p>
                  To be able to receive notifications via sms, upgrade to PREMIUM:
                  <br />

                  <span>
                    * unlimited sms notifications for 25€ subscription
                  </span>

                </p>
                <br />
                <button
                  onClick={this.onUpgrade}
                  type="button"
                  className="btn btn-lg btn-primary"
                >
                  Upgrade my account
                </button>
              </React.Fragment>}

        </div>
      </React.Fragment>
    );
  }
}

Upgrade.contextType = MyContext;

export default Upgrade;
