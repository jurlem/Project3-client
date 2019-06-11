import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import './Reminders.css';

class Reminders extends Component {
  state = {
    selectedDate: '',
    reminders: [],
  };

  componentDidMount () {
    axios
      .get ('http://localhost:6001/reminders/get')
      .then (result => {
        console.log ('LOGGING GET from react ', result.data);
        this.setState ({reminders: result.data});
      })
      .catch (err => {
        console.log (err);
      });
  }

  // instead of LINK to delete the line, i have to make it a function and onclick=handleDelete
  handleDelete = reminder => {
    axios
      .get (`http://localhost:6001/reminders/delete?id=${reminder}`)
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

  // *** get results starting from today!!
  // ***  if selectedDate = something, then show only those
  // *** get only User reminders

  // if (this.state.selectedDate) {
  //   axios
  //     .get ('http://localhost:6000/get') // my user && selectedDate
  //     .then (result => {
  //       console.log ('LOGGING GET from react ', result);
  //       this.setState ({reminders: result});
  //     })
  //     .catch (err => {
  //       console.log (err);
  //     });
  // }
  //   else {
  //     axios
  //       .get ('/getreminders') // my user && from today
  //       .then (result => {
  //         console.log (result);
  //         this.setState ({reminders: result});
  //       })
  //       .catch (err => {
  //         console.log (err);
  //       });
  //   }
  // }

  render () {
    return (
      <React.Fragment>
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
          <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
        </div>

      </React.Fragment>
    );
  }
}

export default Reminders;
