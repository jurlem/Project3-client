import React, {Component} from 'react';
import axios from 'axios';
import Pagination from '../common/pagination';
import {paginate} from '../utils/paginate';
import {MyContext} from './ReactContext';

class Manage extends Component {
  state = {
    users: [],
    pageSize: 3,
    currentPage: 1,
  };

  // into common!?
  onPageChange = page => {
    this.setState ({currentPage: page});
  };

  //siin vaata Gijs'i pokemoni näidet
  componentDidMount () {
    axios.get ('http://localhost:6001/manage').then (result => {
      console.log ('showing the results from manage: ', result.data);
      this.setState ({users: result.data});
    });
  }

  render () {
    const {pageSize, currentPage, users: allUsers} = this.state;
    const users = paginate (allUsers, currentPage, pageSize);

    let nrOfUsers = this.state.users.length;
    if (nrOfUsers === 0) return <p>There are no users in the database.</p>;
    return (
      <React.Fragment>
        <div className="container pd-top">
          <h1>Admin tab</h1>
          <p>The number of users in the system: {nrOfUsers}</p>
          <table className="table">
            <thead>
              <tr>
                <th>user name </th>
                <th>userId</th>
                <th>email address</th>
                <th>phone</th>
                <th>type of user</th>
                <th>email/sms</th>

                <th />
              </tr>
            </thead>
            <tbody>

              {users.map ((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{user.first_name} </td>
                    <td>{user._id} </td>
                    <td>{user.email_address} </td>
                    <td>{user.phone_number} </td>
                    <td>{user.typeOfUser}</td>

                    <td>
                      {user.premium === true
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
          <Pagination
            itemsCount={this.state.users.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.onPageChange}
          />
        </div>

      </React.Fragment>
    );
  }
}
Manage.contextType = MyContext;

export default Manage;
