import React, {Component} from 'react';
import Calendar from './Calendar';
import Reminders from './Reminders';
import './ReminderTool.css';

class ReminderTool extends Component {
  state = {
    selectedDate: {},
    theUser: '',
    typeOfUser: '',
  };

  componentDidMount () {
    this.setState ({theUser: this.props.theUser});
  }

  // comp did mount call all the reminders based on the date and user
  //axios call
  // get route backend  - to DB

  render () {
    return (
      <React.Fragment>

        <div className="remindertool pd-top">
          <Calendar />
          <Reminders />
        </div>

      </React.Fragment>
    );
  }
}

export default ReminderTool;
