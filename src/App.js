import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {MyProvider, MyContext} from './components/ReactContext';
import NewReminder from './components/NewReminder';
import ReminderTool from './components/ReminderTool';
import Upgrade from './components/Upgrade';
import Manage from './components/Manage';
import Nav from './components/Nav';
import PaypalButton from './components/PaypalButton';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Profile from './components/Profile';

import './App.css';
// import ReactContext from './components/ReactContext';

class App extends Component {
  state = {};

  render () {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <Nav />
            <main className="container">
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/Login" component={Login} />
                <Route path="/logout" component={Logout} />

                {/* <Route
                exact
                path="/"
                render={routerProps => (
                  <ReminderTool
                    {...routerProps}
                    passUser={this.state.theUser}
                  /> */}
                )}

                {/* protected ADMIN route * EI TÖÖTA!!*/}
                <Route path="/manage" component={Manage} />

                {/* <Route
                  path="/manage"
                  render={props => {
                    if (context.state.typeOfUser === 'ADMIN')
                      return <Redirect to="/" />;
                    return <Manage {...props} />;
                  }}
                />; */}

                {/* // make PROTECTED USER routes */}
                <Route
                  path="/newreminder"
                  render={props => {
                    if (!context.state.theUser) return <Redirect to="/login" />;
                    return <NewReminder {...props} />;
                  }}
                />;
                <Route
                  path="/upgrade"
                  render={props => {
                    if (!context.state.theUser) return <Redirect to="/login" />;
                    return <Upgrade {...props} />;
                  }}
                />;

                <Route
                  path="/profile"
                  render={props => {
                    if (!context.state.theUser) return <Redirect to="/login" />;
                    return <Profile {...props} />;
                  }}
                />;

                <Route exact path="/" component={ReminderTool} />
                <Route path="/pay" component={PaypalButton} />
                <Route path="/nothinghere" component={NotFound} />

                <Redirect to="/nothinghere" />

                {/* <Redirect from="/" exact to="/login" />
            */}

                {/* <Route
            exact
            path="/login"
            render={() =>
              theUser ? <Redirect to="/login" /> : <ReminderTool />}
          /> */}

              </Switch>
            </main>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

App.contextType = MyContext;

export default App;
