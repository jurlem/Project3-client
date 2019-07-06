import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ProfileEdit extends Component {
  state = {
    _id: this.context.state.userId,
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
        `/users/profileedit`,
        this.state
        // {
        //   withCredentials: true,
        // }
      )
      .then (response => {
        console.log ('This comes back from profileedit:', response.data);
        //update context state:
        this.context.handleLogin (response);

        this.props.history.push ('/profile');
      })
      .catch (err => {
        this.setState ({error: err.response.message});
        console.log (err);
      });
  };

  render () {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>

            {/* FORM */}

            <main className="Edit-profile-form">
              <div className="cotainer pd-top">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">EDIT YOUR DETAILS:</div>
                      <div className="card-body">
                        <form onSubmit={this.handleFormSubmit}>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              My name{' '}
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={context.state.first_name}
                                type="text"
                                id="first_name"
                                className="form-control"
                                name="first_name"
                                autoFocus
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              My email address
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={context.state.email_address}
                                type="text"
                                id="email_address"
                                className="form-control"
                                name="email_address"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              My mobile number
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={context.state.phone_number}
                                type="text"
                                id="phone_number"
                                className="form-control"
                                name="phone_number"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          {/* <div className="form-group row">
                            <label
                              htmlFor="password"
                              className="col-md-4 col-form-label text-md-right"
                            >
                              Update Password
                            </label>
                            <div className="col-md-6">
                              <input
                                type="password"
                                id="password"
                                className="form-control"
                                name="password"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div> */}

                          {/* ERROR messge: */}
                          <div className="text-danger text-uppercase">
                            {this.state.error ? <p>{this.state.error}</p> : ''}
                          </div>

                          <div className="form-group row" />
                          <div className="col-md-6 offset-md-4">
                            <button type="submit" className="btn btn-primary">
                              Update changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>

            </main>

          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
ProfileEdit.contextType = MyContext;

export default ProfileEdit;
