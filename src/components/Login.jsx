import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {
    email_address: '',
    password: '',
    theUser: '',
    typeOfUser: '',
    error: '',
  };

  handleEntry = e => {
    console.log (e.target.value);
    let {name, value} = e.target;
    this.setState ({[name]: value});
  };

  handleFormSubmit = e => {
    e.preventDefault ();
    axios
      .post ('http://localhost:6001/auth/login', this.state)
      .then (response => {
        console.log ('This comes back from auth/login:', response.data);

        // localStorage.setItem ('theUser', response.data.first_name);
        // localStorage.setItem ('typeOfUser', response.data.typeOfUser);

        // this.setState ({}); this desnt refresh the NAV bar
        this.props.onLogin (response);
        this.props.history.push ('/');
        // window.location = '/';

        //https://www.lullabot.com/articles/processing-forms-in-react
        // ütle, et message is sent && refresh the page!!!
        // in successful log-in, sends to main page //NOT allowed - refreshes the pge
      })
      .catch (err => {
        //this.setState ({error: err.response.data.message});
        console.log (err);
      });
  };

  // ADD: validateInput faction onChange handler for my form
  // https://goshakkk.name/submit-time-validation-react/

  render () {
    return (
      <React.Fragment>
        <div className="pd-top">
          <pre>state:{JSON.stringify (this.state, '\t', 2)}</pre>
          <main className="login-form">
            <div className="cotainer">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">LOG IN</div>
                    <div className="card-body">
                      <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group row">
                          <label
                            htmlFor="email_address"
                            className="col-md-4 col-form-label text-md-right"
                          >
                            E-Mail Address
                          </label>
                          <div className="col-md-6">
                            <input
                              type="text"
                              id="email_address"
                              className="form-control"
                              name="email_address"
                              required
                              autoFocus
                              onChange={e => this.handleEntry (e)}
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="password"
                            className="col-md-4 col-form-label text-md-right"
                          >
                            Password
                          </label>
                          <div className="col-md-6">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              name="password"
                              required
                              onChange={e => this.handleEntry (e)}
                            />
                          </div>
                        </div>

                        {/* ERROR messge: */}
                        <div className="text-danger text-uppercase">
                          {this.state.error ? <p>{this.state.error}</p> : ''}
                        </div>
                        <div className="form-group row">
                          <div className="col-md-6 offset-md-4">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" name="remember" />
                                {' '}
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 offset-md-4">
                          <button type="submit" className="btn btn-primary">
                            Log in
                          </button>
                          <Link to="#" className="btn btn-link">
                            Don't have account yet?
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
