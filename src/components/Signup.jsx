import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBuilding,
  faPhone,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-solid-svg-icons';
// import './Signup.css';

class Signup extends Component {
  state = {
    first_name: '',
    email_address: '',
    phone_number: '',
    premium: '',
    password: '',
    error: '',
  };

  handleEntry = e => {
    console.log (e.target.value);
    let {name, value} = e.target;
    this.setState ({[name]: value});
  };

  handleFormSubmit = e => {
    //console.log ('console.logging the state ', this.state);
    e.preventDefault ();
    axios
      .post ('/auth/signup', this.state)
      .then (response => {
        console.log ('This comes back from auth/create:', response);
        //https://www.lullabot.com/articles/processing-forms-in-react
        // ütle, et message is sent && refresh the page
        this.props.history.push ('/login');
      })
      .catch (err => {
        this.setState ({error: err.response.data.message});
        console.log (err.response.data);
      });
  };

  render () {
    return (
      <React.Fragment>
        <div class="container">
          <br />
          <hr />

          <div class="card bg-light">
            <article class="card-body mx-auto" style={{'max-width': '400px'}}>
              <h4 class="card-title mt-3 text-center">Create Account</h4>
              <p class="text-center">Get started with your free account</p>
              <p>
                {/* <Link to="" class="btn btn-block btn-twitter"> */}
                {/* <i class="fab fa-twitter" /> Login via Twitter */}
                {/* </Link> */}
                {/* <a to="" class="btn btn-block btn-facebook">
                    {' '}
                    <i class="fab fa-facebook-f" /> Login via facebook
                  </a> */}
              </p>
              {/* <p class="divider-text">
                <span class="bg-light">OR</span>
              </p> */}
              <form onSubmit={this.handleFormSubmit}>
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    name="first_name"
                    class="form-control"
                    placeholder="First name"
                    type="text"
                    onChange={e => this.handleEntry (e)}
                  />
                </div>
                {/* <!-- form-group// --> */}
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  <input
                    name="email_address"
                    class="form-control"
                    placeholder="Email address"
                    type="email"
                    onChange={e => this.handleEntry (e)}
                  />
                </div>
                {/* <!-- form-group// --> */}
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                  </div>
                  <select class="custom-select" style={{'max-width': '120px'}}>
                    <option selected="">+31</option>
                    <option value="1">+972</option>
                    <option value="2">+198</option>
                    <option value="3">+701</option>
                  </select>
                  <input
                    name="phone_number"
                    class="form-control"
                    placeholder="Phone number"
                    type="text"
                    onChange={e => this.handleEntry (e)}
                  />
                </div>

                {/* <!-- form-group// --> */}
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faBuilding} />
                      <i class="fa fa-building" />{' '}
                    </span>
                  </div>
                  <select
                    name="premium"
                    class="form-control"
                    onChange={e => this.handleEntry (e)}
                  >
                    <option value="?" selected=""> Select Premium</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* <!-- form-group end.// -->  */}
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  <input
                    name="password"
                    class="form-control"
                    placeholder="Create password"
                    type="password"
                    onChange={e => this.handleEntry (e)}
                  />
                </div>
                {/* <!-- form-group// --> */}
                <div class="form-group input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  <input
                    name="password"
                    class="form-control"
                    placeholder="Repeat password"
                    type="password"
                    onChange={e => this.handleEntry (e)}
                  />
                </div>
                {/* ERROR messge: */}
                <div className="text-danger text-uppercase">
                  {this.state.error ? <p>{this.state.error}</p> : ''}
                </div>

                {/* <!-- form-group// -->                                       */}
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block">
                    Create Account{' '}
                  </button>
                </div>
                {/* <!-- form-group// -->       */}
                <p class="text-center">
                  Have an account? <Link to="">Log In</Link>{' '}
                </p>
              </form>
            </article>
          </div>
          {/* <!-- card.// -->  */}
        </div>
      </React.Fragment>
    );
  }
}
export default Signup;
