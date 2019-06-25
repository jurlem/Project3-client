import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';

class NewReminder extends Component {
  state = {};

  componentDidMount () {
    console.log (this.context);
  }

  handleEntry = e => {
    console.log (e.target.value);
    let {name, value} = e.target;
    this.setState ({[name]: value});
  };

  handleFormSubmit = e => {
    console.log (this.context);

    const reminder = Object.assign ({}, this.state, {
      userId: this.context.state.userId,
    });

    e.preventDefault ();
    axios
      .post ('http://localhost:6001/reminders/create', reminder)
      .then (response => {
        console.log (reminder);
        console.log ('response from reminder response', response);
        //https://www.lullabot.com/articles/processing-forms-in-react
        // ütle, et message is sent && refresh the page
        //{message: reminder saved!}
        //this.context. ();
        this.props.history.push ('/');
      })
      .catch (err => {
        console.log (err);
      });
  };

  // ADD: validateInput faction onChange handler for my form
  // https://goshakkk.name/submit-time-validation-react/

  render () {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div className="pd-top">
              <h1>{context.state.userId}</h1>
              <h2>{this.state.userId}</h2>

              <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
              <h1>New Reminder</h1>
            </div>
            <div>
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-group row">
                  <label htmlFor="date" className="col-sm-2 col-form-label">
                    Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      id="date"
                      placeholder="Date"
                      onChange={e => this.handleEntry (e)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="time" className="col-sm-2 col-form-label">
                    Time
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="time"
                      name="time"
                      className="form-control"
                      id="time"
                      placeholder="10:00"
                      onChange={e => this.handleEntry (e)}
                    />
                  </div>
                </div>
                {/* Remind me  */}
                <div className="form-group row">
                  <label htmlFor="remindme" className="col-sm-2 col-form-label">
                    Remind me :
                  </label>
                  <div
                    className="col-sm-10"
                    onChange={e => this.handleEntry (e)}
                  >
                    <select
                      name="remindMe"
                      className="form-control"
                      id="remindme"
                    >
                      <option value="">
                        Please choose reminder alert time:
                      </option>
                      <option value="6h">6 hours before</option>
                      <option value="3h">3 hours before</option>
                      <option value="1h">1 hour before</option>
                      <option value="25min">25 minutes before</option>
                      <option value="0min">At time of event</option>
                      <option value="none">Without reminder</option>
                    </select>
                  </div>
                </div>
                {/* Text field */}
                <div className="form-group row">
                  <label htmlFor="text" className="col-sm-2 col-form-label">
                    Reminder:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="text"
                      className="form-control"
                      id="text"
                      placeholder="Enter your reminder here"
                      onChange={e => this.handleEntry (e)}
                    />
                  </div>
                </div>
                {/* Radios */}
                <fieldset
                  className="form-group"
                  onChange={e => this.handleEntry (e)}
                >
                  <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Radios
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gridRadios"
                          id="gridRadios1"
                          value="email"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridRadios1"
                        >
                          EMAIL reminder notification
                        </label>
                      </div>
                      {context.state.premium === 'true'
                        ? <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios2"
                              value="sms"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridRadios2"
                            >
                              SMS reminder notification
                            </label>
                          </div>
                        : ''}

                    </div>
                  </div>
                </fieldset>
                <div className="form-group row">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

NewReminder.contextType = MyContext;

export default NewReminder;
