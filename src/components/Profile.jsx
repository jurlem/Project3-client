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
          <React.Fragment>

            <div className="pd-top">
              <h1> {context.state.theUser} Profile page </h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>My name </th>
                    <th>My email address</th>
                    <th>My mobile number </th>
                    <th>SMS Reminders</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr key={context.state.id}>

                    <td>{context.state.first_name}</td>
                    <td> {context.state.email_address}</td>
                    <td>{context.state.phone_number}</td>
                    <td>
                      {' '}  {context.state.premium === 'true'
                        ? <p>
                            Yes
                          </p>
                        : <p>
                            No
                          </p>}
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm">
                        {/* {' '}// onClick={() => //this.handleDelete ()} */}
                        Edit contact details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2> Statistics</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Reminders Total</th>
                    <th>Email </th>
                    <th>SMS </th>
                    <th>SMS Reminders</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr key={context.state.id}>

                    <td>{context.state.first_name}</td>
                    <td> {context.state.email_address}</td>
                    <td>{context.state.phone_number}</td>
                    <td>
                      {' '}{context.state.premium === 'true'
                        ? <p>
                            Yes
                          </p>
                        : <p>
                            No
                          </p>}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>

            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Profile;
