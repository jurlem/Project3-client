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
import ProfileEdit from './components/ProfileEdit';
import RemindersEdit from './components/RemindersEdit';
import ManageEdit from './components/ManageEdit';
import ProtectedRoute from './common/ProtectedRoute';
import ProtectedAdminRoute from './common/ProtectedAdminRoute';
import './App.css';

class App extends Component {
  state = {};

  render () {
    const {theUser, typeOfUser} = this.context.state;
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

                {/* protected ADMIN route * EI TÖÖTA!!*/}
                {/* <Route
                  path="/manage"
                  render={props => {
                    if (context.state.typeOfUser === 'ADMIN')
                      return <Redirect to="/" />;
                    return <Manage {...props} />;
                  }}
                />; */}

                {/* <Route path="/newreminder" component={NewReminder} />
                <Route path="/upgrade" component={Upgrade} />
                <Route path="/profile" component={Profile} />
                <Route path="/profileedit" component={ProfileEdit} /> */}

                <ProtectedRoute path="/newreminder" component={NewReminder} />;
                <ProtectedRoute path="/upgrade" component={Upgrade} />;
                <ProtectedRoute path="/profile" component={Profile} />;
                <ProtectedRoute path="/profileedit" component={ProfileEdit} />;

                <ProtectedRoute
                  path="/remindersedit"
                  component={RemindersEdit}
                />
                {/* // make PROTECTED USER routes - creates trouble */}
                <Route path="/manage" component={Manage} />
                <Route path="/manageedit" component={ManageEdit} />

                <Route exact path="/" component={ReminderTool} />
                <Route path="/nothinghere" component={NotFound} />
                <Redirect to="/nothinghere" />

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
