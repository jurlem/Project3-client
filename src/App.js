import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
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

class App extends Component {
  state = {
    theUser: false,
    typeOfUser: 'USER',
  };

  componentDidMount () {
    this.setState ({
      theUser: localStorage.getItem ('theUser'),
      typeOfUser: localStorage.getItem ('typeOfUser'),
    });
  }

  handleLogin (response) {
    try {
      localStorage.setItem ('theUser', response.data.first_name);
      localStorage.setItem ('typeOfUser', response.data.typeOfUser);

      this.setState ({
        theUser: localStorage.getItem ('theUser'),
        typeOfUser: localStorage.getItem ('typeOfUser'),
      });
    } catch (error) {
      console.log (error);
    }
  }

  handleLogout () {
    try {
      localStorage.clear ();
    } catch (error) {
      console.log (error);
    }
  }

  render () {
    return (
      <React.Fragment>
        <Nav
          theUser={localStorage.theUser}
          typeOfUser={localStorage.typeOfUser}
        />
        <main className="container">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route
              path="/Login"
              render={routeProps => (
                <Login {...routeProps} onLogin={this.handleLogin} />
              )}
            />
            <Route path="/" component={ReminderTool} />
            <Route exact path="/newreminder" component={NewReminder} />
            <Route path="/upgrade" component={Upgrade} />
            <Route path="/manage" component={Manage} />
            <Route path="/pay" component={PaypalButton} />
            <Route path="/profile" component={Profile} />
            <Route path="/nothinghere" component={NotFound} />
            <Redirect to="/nothinghere" />
            <Route
              path="/logout"
              render={routeProps => (
                <Logout {...routeProps} onLogout={this.handleLogout} />
              )}
            />
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
