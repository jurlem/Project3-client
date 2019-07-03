import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';
import {Link} from 'react-router-dom';

class RemindersEdit extends Component {
  state = {
    // _id: this.props.state.userId,

    first_name: this.context.state.first_name,
    email_address: this.context.state.email_address,
    phone_number: this.context.state.phone_number,
  };

  handleEntry = e => {
    console.log (e.target.value);
    let {name, value} = e.target;
    this.setState ({[name]: value});
    // defaultValue ?
  };

  handleFormSubmit = e => {
    e.preventDefault ();
    let _id = this.context.state.userId;
    axios
      .post (
        `http://localhost:6001/users/remindersedit`,
        this.state
        // {
        //   withCredentials: true,
        // }
      )
      .then (response => {
        console.log ('This comes back from remindersedit:', response.data);
        //update context state:
        // this.context.handleLogin (response);

        this.props.history.push ('/');
      })
      .catch (err => {
        this.setState ({error: err.response.message});
        console.log (err);
      });
  };

  render () {
    // const userId = this.context.state.userId;
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>

            {/* FORM */}
            <div className="pd-top">
              <h1>Edit Your Reminder</h1>
            </div>
            <div>
              <form onSubmit={this.handleFormSubmit}>

                <div className="form-group row">
                  <label htmlFor="date" className="col-sm-2 col-form-label">
                    Date and time
                  </label>
                  <div className="col-sm-10">
                    <input
                      defaultValue={context.state.email_address}
                      type="datetime-local"
                      name="date"
                      className="form-control"
                      id="date"
                      placeholder="Date"
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
                      Submit EDIT
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>

          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
RemindersEdit.contextType = MyContext;

export default RemindersEdit;
