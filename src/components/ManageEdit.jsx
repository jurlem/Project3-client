import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ManageEdit extends Component {
  state = {
    _id: this.props.location.state.userId,
    first_name: this.props.location.state.first_name,
    userId: this.props.location.state.userId,
    email_address: this.props.location.state.email_address,
    phone_number: this.props.location.state.phone_number,
    typeOfUser: this.props.location.state.typeOfUser,
    premium: this.props.location.state.premium,
    error: '',
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
        `/users/manageedit`,
        this.state
        // {
        //   withCredentials: true,
        // }
      )
      .then (response => {
        console.log ('This comes back from profileedit:', response.data);

        //update context state:
        // sii vaha veidi teist update'i, mis ei muudaks kasutatavat ära kogu äpis
        // this.context.handleLogin (response);

        this.props.history.push ('/manage');
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

            <main className="Edit-manage-form">
              <div className="cotainer pd-top">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        ADMIN EDITING TAB
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.handleFormSubmit}>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              User name
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.first_name}
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
                              UserId
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.userId}
                                type="text"
                                id="userId"
                                className="form-control"
                                name="userId"
                                autoFocus
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              email address
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.email_address}
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
                              Mobile number
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.phone_number}
                                type="text"
                                id="phone_number"
                                className="form-control"
                                name="phone_number"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              Type of user
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.typeOfUser}
                                type="text"
                                id="typeOfUser"
                                className="form-control"
                                name="typeOfUser"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">
                              Premium
                            </label>
                            <div className="col-md-6">
                              <input
                                defaultValue={this.state.premium}
                                type="text"
                                id="phone_number"
                                className="form-control"
                                name="premium"
                                onChange={e => this.handleEntry (e)}
                              />
                            </div>
                          </div>

                          {/* ERROR messge: */}
                          <div className="text-danger text-uppercase">
                            {this.state.error ? <p>{this.state.error}</p> : ''}
                          </div>

                          <div className="form-group row" />
                          <div className="col-md-6 offset-md-4">

                            <button type="submit" className="btn btn-primary">
                              Update changes
                            </button>
                            {/* <button className="btn m-2 btn-danger">
                              onClick={() => this.handleDelete (this.state._id)}

                              Delete user
                            </button> */}
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
ManageEdit.contextType = MyContext;

export default ManageEdit;
