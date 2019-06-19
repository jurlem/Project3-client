import React, {Component} from 'react';

class Logout extends Component {
  state = {};

  confirmLogout = () => {
    this.props.onLogout ();
    this.props.history.push ('/');
    //window.location = '/login';
  };

  render () {
    return (
      <div className="pd-top">
        <h3>
          Click here to confirm log out
        </h3>
        <button onClick={this.confirmLogout}> Confirm Logout</button>
      </div>
    );
  }
}

export default Logout;
