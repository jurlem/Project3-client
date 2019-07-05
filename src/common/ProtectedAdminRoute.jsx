import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {MyContext} from '../components/ReactContext';

class ProtectedAdminRoute extends Component {
  state = {};

  render () {
    const {path, component: Component, render, ...rest} = this.props;

    return (
      <MyContext.Consumer>
        {context => (
          <Route
            path={path}
            {...rest}
            render={props => {
              if (!context.state.theUser) return <Redirect to="/login" />;
              if (!context.state.typeOfUser === 'ADMIN')
                return <Redirect to="/login" />;
              return Component ? <Component {...props} /> : render (props);
            }}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
ProtectedAdminRoute.contextType = MyContext;

export default ProtectedAdminRoute;
