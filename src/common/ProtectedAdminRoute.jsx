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
              if (context.state.typeOfUser === 'ADMIN')
                return Component ? <Component {...props} /> : render (props);
              return <Redirect to="/login" />;
            }}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
ProtectedAdminRoute.contextType = MyContext;

export default ProtectedAdminRoute;
