import React, {Component} from 'react';
import axios from 'axios';
import RemindersTable from './RemindersTable';
import {MyContext} from './ReactContext';
import Pagination from '../common/pagination';
import {paginate} from '../utils/paginate';
import {Link} from 'react-router-dom';

import './Reminders.css';

class Reminders extends Component {
  state = {
    selectedDay: '',
    reminders: [],
    pageSize: 5,
    currentPage: 1,
  };

  onPageChange = page => {
    this.setState ({currentPage: page});
  };

  componentDidMount () {
    // console.log ('console.log this.context', this.context.state.userId);
    const userId = this.context.state.userId;
    axios
      .get (`http://localhost:6001/reminders/get?id=${userId}`)
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
  // ***  if selectedDay = something, then show only those
  // *** get only User reminders

  render () {
    const {pageSize, currentPage, reminders: allReminders} = this.state;

    if (this.state.reminders.length === 0)
      return <p>There are no reminders in the database.</p>;

    const reminders = paginate (allReminders, currentPage, pageSize);

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>

            <h2>Reminders </h2>
            <br />
            {this.context.state.premium === 'false'
              ? <Link to="/upgrade">Ugrade to activate SMS reminders!</Link>
              : ''}
            <RemindersTable
              reminders={reminders}
              handleDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={this.state.reminders.length}
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
