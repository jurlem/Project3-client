import React, {Component} from 'react';
import axios from 'axios';

class Manage extends Component {
  state = {
    users: [],
  };

  //siin vaata Gijs'i pokemoni näidet
  componentDidMount () {
    axios.get ('http://localhost:6001/manage').then (result => {
      console.log ('showing the results from manage: ', result.data);
      this.setState ({users: result.data});
    });
  }

  render () {
    return (
      <React.Fragment>
        <div className="container pd-top">
          <h1>Admin tab</h1>
          <table className="table">
            <thead>
              <tr>
                <th>user name </th>
                <th>userId</th>
                <th>email address</th>
                <th>phone</th>
                <th>type of user</th>
                <th>email/sms</th>
                <th>nr of reminders </th>

                <th />
              </tr>
            </thead>
            <tbody>

              {this.state.users.map ((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{user.first_name} </td>
                    <td>{user._id} </td>
                    <td>{user.email_address} </td>
                    <td>{user.phone_number} </td>
                    <td>{user.typeOfUser}</td>

                    <td>
                      {user.premium === 'true' ? <p>SMS</p> : <p>Email</p>}
                      {user.premium === 'true'
                        ? <p>
                            Yes
                          </p>
                        : <p>
                            No
                          </p>}
                    </td>

                    <td>
                      <button className="btn btn-primary btn-sm">

                        {/* onClick={() => this.handleDelete (reminder._id)} */}

                        EDIT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </React.Fragment>
    );
  }
}

export default Manage;
