import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Profile extends Component {
  state = {};

  componentDidMount () {
    const userId = this.context.state.userId;
    axios
      .get (`http://localhost:6001/reminders/statistics?userId=${userId}`)
      .then (result => {
        console.log ('LOGGING GET from reminders/statistics ', result.data);
        this.setState ({reminders: result.data});
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
                      {' '}  {context.state.premium === 'true'
                        ? <p>
                            Yes
                          </p>
                        : <p>
                            No
                            {' '}
                            <Link to="/upgrade">
                              Ugrade to activate SMS reminders!
                            </Link>
                            }
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

              {this.context.state.premium === 'false'
                ? <Link>Ugrade to activate SMS reminders!</Link>
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
