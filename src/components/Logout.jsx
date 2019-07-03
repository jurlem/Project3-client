import React, {Component} from 'react';
import {MyContext} from './ReactContext';

class Logout extends Component {
  state = {};

  confirmLogout = () => {
    this.context.handleLogout ();
    this.props.history.replace ('/login');
  };

  render () {
    return (
      <div className="pd-top">
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <h3>
                Click here to confirm log out
              </h3>
              <button className="btn btn-primary" onClick={this.confirmLogout}>
                {' '}Confirm Logout
              </button>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
Logout.contextType = MyContext;

export default Logout;
