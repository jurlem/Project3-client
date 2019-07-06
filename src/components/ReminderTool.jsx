import React, {Component} from 'react';
import axios from 'axios';
import {MyContext} from './ReactContext';
import Calendar from './Calendar';
import Reminders from './Reminders';
import './ReminderTool.css';
import RemindersEdit from './RemindersEdit';

class ReminderTool extends Component {
  state = {
    reminders: [],
  };

  componentDidMount () {
    // async lisasin ise, pole kindel kumb lahendus triki teeb, kuid reminderitega probleemi pole
    // see on Gijs'i lisatud rida, et ei renderdaks enne lehte kui remindereide loeb:
    const userId = this.context.state.userId
      ? this.context.state.userId
      : localStorage.getItem ('userId');
    axios
      .get (`/reminders/get?id=${userId}`)
      .then (result => {
        console.log ('LOGGING GET from reminders/Get ', result.data);
        this.setState ({reminders: result.data});
      })
      .catch (err => {
        console.log (err);
      });
  }

  handleDelete = reminder => {
    axios
      .get (`/reminders/delete?id=${reminder}`)
      .then (result => {
        console.log ('Deleted:', result.data.message);
        this.setState ({});
        this.props.history.push ('/');
      })
      .catch (err => {
        console.log (err);
      });

    const prevReminders = this.state.reminders;
    let newReminders = prevReminders.filter (item => {
      return item._id !== reminder;
    });

    this.setState ({reminders: newReminders});
  };

  // HANDLE EDIT REMINDER

  handleDelete = reminder => {
    axios
      .get (`/reminders/remindersedit?id=${reminder}`)
      //pean miskit kaasa andma nagu Edit user in profile

      .then (result => {
        console.log ('EDITED:', result.data.message);
        this.setState ({});
        this.props.history.push ('/');
      })
      .catch (err => {
        console.log (err);
      });

    const prevReminders = this.state.reminders;
    let newReminders = prevReminders.filter (item => {
      return item._id !== reminder;
    });

    this.setState ({reminders: newReminders});
  };

  render () {
    return (
      <div className="remindertool pd-top-main">
        <Calendar reminders={this.state.reminders} />
        <Reminders
          reminders={this.state.reminders}
          handleDelete={this.handleDelete}
        />
        {/* <RemindersEdit reminders={this.state.reminders} /> */}

      </div>
    );
  }
}
ReminderTool.contextType = MyContext;

export default ReminderTool;
