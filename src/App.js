import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NewReminder from './components/NewReminder';
import ReminderTool from './components/ReminderTool';
import Upgrade from './components/Upgrade';
import Manage from './components/Manage';
import Nav from './components/Nav';
import PaypalButton from './components/PaypalButton';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App () {
  return (
    <main className="container">
      <Nav />

      <Switch>
        <Route exact path="/newreminder" component={NewReminder} />
        <Route path="/upgrade" component={Upgrade} />
        <Route path="/manage" component={Manage} />
        <Route path="/pay" component={PaypalButton} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* <Route
          exact
          path="/signup"
          render={() => (loggedIn ? <Redirect to="/" /> : <Signup />)}
        /> */}

        <Route exact path="/" component={ReminderTool} />

      </Switch>

    </main>
  );
}

export default App;
