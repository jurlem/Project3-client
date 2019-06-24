import React, {Component} from 'react';
import Calendar from './Calendar';
import Reminders from './Reminders';
//import axios from 'axios';
import './ReminderTool.css';

class ReminderTool extends Component {
  state = {
    // selectedDate: {},
    // theUser: this.props.theUser,
    // typeOfUser: '',
  };

  componentDidMount () {
    // axios
    //   .get ('http://localhost:6001/currentuser', this.state.theUser)
    //   .then (response => {
    //     console.log ('This comes back from get user reminders:', response);
    //   });
    this.setState ({theUser: this.props.theUser});
  }

  //this.props.passUser
  // comp did mount call all the reminders based on the date and user
  //axios call
  // get route backend  - to DB

  render () {
    return (
      <React.Fragment>

        <div className="remindertool pd-top-main">
          <Calendar theUser={this.props.theUser} />
          <Reminders />
        </div>

      </React.Fragment>
    );
  }
}

export default ReminderTool;
