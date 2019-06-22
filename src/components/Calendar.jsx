import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import CalendarReact from 'react-calendar';
//A function that returns a IETF language tag, based on all available sources.
import getUserLocale from 'get-user-locale';
import './Calendar.css';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Calendar extends Component {
  state = {
    selectedDay: undefined,
    today: new Date (),
  };

  onDayClick = (day, {selected}) => {
    if (selected) {
      // Unselect the day if already selected
      this.setState ({selectedDay: undefined});

      let selectedDayForContext = undefined;
      //run a method of MyContext to update the setstate in context
      this.context.selectedDayContext (selectedDayForContext);

      return;
    }

    this.setState ({selectedDay: day});
    let selectedDayForContext = this.state.selectedDay;
    //console.log ('logging dayClick:', selectedDayForContext);
    this.context.selectedDayContext (selectedDayForContext);
  };

  render () {
    const locale = getUserLocale ();

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>

            <div className="body">
              <h1>Calendar</h1>

              <DayPicker
                onDayClick={this.onDayClick}
                selectedDays={this.state.selectedDay}
                firstDayOfWeek={1}
              />

              {this.state.selectedDay
                ? <p>
                    You clicked {this.state.selectedDay.toLocaleDateString ()}
                  </p>
                : <p>Choose a day</p>}
              <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
Calendar.contextType = MyContext;

export default Calendar;
