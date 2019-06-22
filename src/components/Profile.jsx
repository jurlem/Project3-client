import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';

class Profile extends Component {
  state = {};

  componentDidMount () {}

  render () {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="pd-top">
            <h1>My ReminderTool Profile page {context.state.theUser}</h1>
            <p>My name: {context.state.first_name}</p><br />
            <p>My email address: {context.state.email_address}</p><br />
            <p>My telefon number: {context.state.phone_number}</p><br />
            <p>premium : {context.premium} ? Yes : No</p><br />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Profile;
