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
      <React.Fragment>

        {/* <ReactContext
          theUser={this.state.theUser}
          typeOfUser={this.state.typeOfUser}
        /> */}
        <Nav />
        <main className="container">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/Login" component={Login} />
            <Route path="/logout" component={Logout} />

            {/* // make protected routes */}

            {/* <Route
                exact
                path="/"
                render={routerProps => (
                  <ReminderTool
                    {...routerProps}
                    passUser={this.state.theUser}
                  /> */}
            )}
            <Route exact path="/newreminder" component={NewReminder} />
            <Route path="/upgrade" component={Upgrade} />
            <Route path="/manage" component={Manage} />
            <Route path="/pay" component={PaypalButton} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/" component={ReminderTool} />
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
    );
  }
}

export default App;
