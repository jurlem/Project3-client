import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  state = {};

  handleEntry = e => {
    console.log (e.target.value);
    let {name, value} = e.target;
    this.setState ({[name]: value});
  };

  handleFormSubmit = e => {
    console.log ('console.logging the state ', this.state);
    e.preventDefault ();
    axios
      .post ('http://localhost:6001/auth/login', this.state)
      .then (response => {
        console.log ('console logging post /login', response);

        // localStorage.setItem ( ('token': jwt));
        // this.props.history.push ('/');
        //https://www.lullabot.com/articles/processing-forms-in-react
        // ütle, et message is sent && refresh the page
      })
      .catch (err => {
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
          <main class="login-form">
            <div class="cotainer">
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-header">LOG IN</div>
                    <div class="card-body">
                      <form onSubmit={this.handleFormSubmit}>
                        <div class="form-group row">
                          <label
                            for="email_address"
                            class="col-md-4 col-form-label text-md-right"
                          >
                            E-Mail Address
                          </label>
                          <div class="col-md-6">
                            <input
                              type="text"
                              id="email_address"
                              class="form-control"
                              name="email_address"
                              required
                              autofocus
                              onChange={e => this.handleEntry (e)}
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label
                            for="password"
                            class="col-md-4 col-form-label text-md-right"
                          >
                            Password
                          </label>
                          <div class="col-md-6">
                            <input
                              type="password"
                              id="password"
                              class="form-control"
                              name="password"
                              required
                              onChange={e => this.handleEntry (e)}
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <div class="col-md-6 offset-md-4">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox" name="remember" />
                                {' '}
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6 offset-md-4">
                          <button type="submit" class="btn btn-primary">
                            Log in
                          </button>
                          <a href="#" class="btn btn-link">
                            Dont't have account yet?
                          </a>
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
