import React, {Component} from 'react';
import axios from 'axios';
import {MyContext} from './ReactContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import './Reminders.css';

class Reminders extends Component {
  state = {
    selectedDay: '',
    reminders: [],
  };

  componentDidMount () {
    // console.log ('console.log this.context', this.context.state.userId);
    const userId = this.context.state.userId;
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

  // funktsioon, mis kasutab context.state.selecyedDay'id, et näidata selle userID'ga  seotud remindereid

  handleDelete = reminder => {
    axios
      .get (`/reminders/delete?id=${reminder}`)
      .then (result => {
        console.log ('Deleted:', result.data.message);
        this.setState ({});
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
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <p>{context.state.userId}</p>
            <div className="reminder">
              <h2>Reminders Compoment</h2>
              <div className="container">

                {this.state.reminders.map ((reminder, index) => {
                  return (
                    <div key={reminder._id}>
                      <p> {reminder.time}</p>
                      <p> {reminder.date}</p>
                      <p> {reminder.text}</p>
                      <p> {reminder.remindMe}</p>
                      <p> {reminder.gridRadios}</p>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.handleDelete (reminder._id)}
                      />
                    </div>
                  );
                })}
              </div>
              {/* <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre> */}
            </div>

          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

Reminders.contextType = MyContext;

export default Reminders;
