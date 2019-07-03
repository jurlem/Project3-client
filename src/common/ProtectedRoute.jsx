import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {MyContext} from '../components/ReactContext';

class ProtectedRoute extends Component {
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
              return Component ? <Component {...props} /> : render (props);
            }}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
ProtectedRoute.contextType = MyContext;

export default ProtectedRoute;

// *************************************'

// as SFC doesnt know the this.context...

// let user = this.context.state.theUser;

// const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={props => {
//         if (!user) return <Redirect to="/login" />;
//         return Component ? <Component {...props} /> : render (props);
//       }}
//     />
//   );
// };
// ProtectedRoute.contextType = MyContext;

// export default ProtectedRoute;
