import React, {Component} from 'react';
import {MyContext} from './ReactContext';

class Logout extends Component {
  state = {};

  confirmLogout = () => {
    this.context.handleLogout ();
    this.props.history.push ('/');
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
              <button onClick={context.handleLogout}> Confirm Logout</button>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}
Logout.contextType = MyContext;

export default Logout;
