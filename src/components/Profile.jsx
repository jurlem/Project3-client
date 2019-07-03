import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {faLessThanEqual} from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {
  state = {};

  componentDidMount () {
    const premium = this.context.state.premium
      ? this.context.state.premium
      : localStorage.getItem ('premium');

    console.log ('logging premium Profile', this.context.state.premium);
    const userId = this.context.state.userId;

    axios
      .get (`http://localhost:6001/reminders/statistics?userId=${userId}`)
      .then (result => {
        console.log ('LOGGING GET from reminders/statistics ', result.data);
        this.setState ({reminders: result.data});
        console.log ('logging premium', this.context.state.premium);
      })
      .catch (err => {
        console.log (err);
      });
  }

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
                    <th>SMS Reminders possible</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr key={context.state.id}>

                    <td>{context.state.first_name}</td>
                    <td> {context.state.email_address}</td>
                    <td>{context.state.phone_number}</td>
                    <td>
                      {context.state.premium === false
                        ? <p>
                            No
                            <Link to="/upgrade">
                              Ugrade to activate SMS reminders!
                            </Link>
                          </p>
                        : <p>
                            Yes
                          </p>}
                    </td>
                    <td>
                      <Link
                        to="/profileedit"
                        className="btn btn-primary btn-sm"
                      >
                        {/* {' '}// onClick={() => //this.handleDelete ()} */}
                        Edit contact details
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              {this.context.state.premium === false
                ? <Link to="/upgrade">Ugrade to activate SMS reminders!</Link>
                : ''}

              <br /><br />
              {/* STATISTICS */}
              <h2> Statistics</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Reminders Total</th>
                    <th>of them Email reminders </th>
                    <th>of then SMS reminders </th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr key={context.state.id}>

                    <td>{this.state.reminders}</td>
                    <td> 5</td>
                    <td>4</td>
                    <td />
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
Profile.contextType = MyContext;

export default Profile;
