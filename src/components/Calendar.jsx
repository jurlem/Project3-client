import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import {Link} from 'react-router-dom';
//A function that returns a IETF language tag, based on all available sources.
import getUserLocale from 'get-user-locale';
import './Calendar.css';

import DayPicker from 'react-day-picker';
import Helmet from 'react-helmet';

import 'react-day-picker/lib/style.css';

// OR : DayPickerInput
// import DayPickerInput from 'react-day-picker/DayPickerInput'

class Calendar extends Component {
  state = {
    selectedDay: undefined,
    today: new Date (),
  };

  onDayClick = (day, {selected}) => {
    let selectedDayForContext;
    if (selected) {
      // Unselect the day if already selected
      this.setState ({selectedDay: undefined});

      //run a method of MyContext to update the setstate in context
      debugger;
      this.context.selectedDayContext (undefined);
      return;
    }

    this.setState ({selectedDay: day});
    // show selected day in context state:
    this.context.selectedDayContext (day);

    // render Reminders per selected day - peab olema siin, sest Reminders'ite comp ei uuene automaatselt (?)
    // this.context.remindersPerDay (day);
  };

  modifier = () => {
    const allDaysHighlighted = this.props.reminders.map (
      reminder => new Date (reminder.date)
    );
    return {
      // birthday: new Date (2019, 5, 7),
      // monday: {[(new Date (2019, 5, 6)), ( new Date (2019, 5, 4))]},

      highlighted: allDaysHighlighted,
    };
  };

  render () {
    const locale = getUserLocale ();

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div className="body">
              <h1>Calendar</h1>
              <Helmet>
                <style>{`
          .DayPicker-Day--birthday {
            background-color: #399fff;
            color: white;
          }
          .DayPicker-Day--highlighted {
            color: #399fff;
            // #00bcd4;
          }
          `}</style>
              </Helmet>

              <DayPicker
                showOutsideDays
                showWeekNumbers
                todayButton="Go to Today"
                onDayClick={this.onDayClick}
                selectedDays={this.state.selectedDay}
                firstDayOfWeek={1}
                //for selected days:
                modifiers={this.modifier ()}
              />
              {this.state.selectedDay
                ? <p>
                    Selected day: {this.state.selectedDay.toLocaleDateString ()}
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
