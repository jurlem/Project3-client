import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from '../common/pagination';
import {paginate} from '../utils/paginate';
import {MyContext} from './ReactContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

class Manage extends Component {
  state = {
    users: [],
    pageSize: 3,
    currentPage: 1,
  };

  onPageChange = page => {
    this.setState ({currentPage: page});
  };

  componentDidMount () {
    console.log ('logging premium MANAGE', this.context.state.premium);

    axios.get ('http://localhost:6001/manage').then (result => {
      console.log ('showing the results from manage: ', result.data);
      this.setState ({users: result.data});
    });
  }

  handleDeleteUser = user => {
    axios
      .get (`http://localhost:6001/users/delete?id=${user}`)
      .then (result => {
        console.log ('Deleted:', result.data.message);
        this.setState ({});
        this.props.history.push ('/manage');
      })
      .catch (err => {
        console.log (err);
      });

    const prevUsers = this.state.users;
    let newUsers = prevUsers.filter (item => {
      return item._id !== user;
    });

    this.setState ({users: newUsers});
  };

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
                <th>Premium</th>

                <th />
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
                      {user.premium === 'Yes'
                        ? <p>
                            Yes
                          </p>
                        : <p>
                            No
                          </p>}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.handleDeleteUser (user._id)}
                      />
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: '/manageedit',
                          state: {
                            userId: `${user._id}`,
                            first_name: `${user.first_name}`,

                            email_address: `${user.email_address}`,
                            phone_number: `${user.phone_number}`,
                            typeOfUser: `${user.typeOfUser}`,
                            premium: `${user.premium}`,
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />

                      </Link>

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
