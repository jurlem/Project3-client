import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {MyContext} from './ReactContext';
import {convertDateToString} from '../utils/convertDateToString';
import {paginate} from '../utils/paginate';
import Pagination from '../common/pagination';
import RemindersTable from './RemindersTable';
import './Reminders.css';

class Reminders extends Component {
  state = {
    selectedDay: '',
    reminders: [],
    pageSize: 5,
    currentPage: 1,
  };

  // for pagination:
  onPageChange = page => {
    this.setState ({currentPage: page});
  };

  filteredFromTodayReminders = reminders => {
    const filteredReminders = reminders.filter (reminder => {
      let rDate = new Date (reminder.date);
      let now = new Date ();
      console.log (rDate > now);
      return rDate > now;
    });
    console.log ('reminders after filter: ', filteredReminders);
    return filteredReminders;
  };

  renderReminderComponent = () => {
    const {pageSize, currentPage} = this.state;
    const {reminders: allReminders} = this.props;
    let reminders = allReminders;
    // let reminders = paginate (allReminders, currentPage, pageSize);
    // let reminders = this.props.reminders;

    let remindersConverted = reminders.map (reminder => {
      return convertDateToString (reminder.date);
      console.log (remindersConverted);
    });

    // Display here only reminders > new Date()
    //make a separate function and place the fuction call here.
    // reminders = reminders.filter (reminder => {
    //   let rDate = new Date (reminder.date);
    //   let now = new Date ();
    //   return rDate > now;
    // });
    const filteredReminders = this.filteredFromTodayReminders (reminders);
    console.log (filteredReminders);
    const selectedDay = this.context.state.selectedDay;

    const showReminder = !selectedDay
      ? filteredReminders
      : this.props.reminders.filter (
          reminder =>
            convertDateToString (reminder.date) ===
            convertDateToString (selectedDay)
        );

    // this.props.reminders.filter(reminder => convertDateToString(reminder.date) === convertDateToString(selectedDay));
    return (
      <RemindersTable
        reminders={showReminder}
        handleDelete={this.props.handleDelete}
        // allReminders={this.state.reminders}
        currentPage={this.state.currentPage}
        pageSize={this.state.pageSize}
      />
    );
  };

  render () {
    const {pageSize, currentPage} = this.state;
    // const {reminders: allReminders} = this.props;

    if (this.props.reminders.length === 0)
      return <p>There are no reminders in the database.</p>;

    // const reminders = paginate (allReminders, currentPage, pageSize);

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <h2>Reminders </h2>
            <br />
            {this.context.state.premium === 'Yes'
              ? ''
              : <Link to="/upgrade">Ugrade to activate SMS reminders!</Link>}

            {/* {!context.state.selectedDay &&
              <RemindersTable
                reminders={reminders}
                handleDelete={this.handleDelete}
              />} */}

            {this.renderReminderComponent ()}

            <Pagination
              itemsCount={
                this.filteredFromTodayReminders (this.props.reminders).length
              }
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.onPageChange}
            />

            {/* <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
            <p>{context.state.userId}</p> */}
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

Reminders.contextType = MyContext;

export default Reminders;
