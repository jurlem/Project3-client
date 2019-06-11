import React, {Component} from 'react';
import getUserLocale from 'get-user-locale';

import './Calendar.css';
import CalendarReact from 'react-calendar';

class Calendar extends Component {
  state = {
    selectedDate: '',
    today: new Date (),
  };

  onChange = date => this.setState ({date});

  render () {
    const locale = getUserLocale ();

    return (
      <React.Fragment>
        <div className="body">
          <h1>Calendar</h1>
          <CalendarReact
            onChange={this.onChange}
            value={this.state.today}
            locale={locale}
            // tileContent={({date, view}) =>
            //   view === 'month' && date.getDay () === 0
            //     ? <p>It's Sunday!</p>
            //     : null}
          />
          <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
        </div>
      </React.Fragment>
    );
  }
}

export default Calendar;
