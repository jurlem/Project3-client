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
        <h1>Admin tab</h1>
        <div className="container pd-top">
          {this.state.users.map ((user, index) => {
            return (
              <div key={user._id}>
                <p>{user.first_name} </p>
                <p>{user.email_address} </p>
                <p>{user.phone_number} </p>
                <p>{user.premium}</p>
              </div>
            );
          })}
        </div>

      </React.Fragment>
    );
  }
}

export default Manage;
