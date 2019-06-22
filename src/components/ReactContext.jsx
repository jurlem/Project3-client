import React, {Component} from 'react';

// first we will make a new context
const MyContext = React.createContext ();

// Then create a provider Component
class MyProvider extends Component {
  state = {
    //siia tuleb sinu soovitud state mida igale pool jagama hakata
  };

  componentDidMount () {}
  checkUser = () => {
    console.log ('checking user from state');
    console.log (this.state.theUser);
    //7check if there is a state in context, if not võta Localstoragest  ja pane see setStte'ga
    if (!this.state.theUser) {
      this.setState ({
        theUser: localStorage.getItem ('theUser'),
        typeOfUser: localStorage.getItem ('typeOfUser'),
        first_name: localStorage.getItem ('first_name'),
        email_address: localStorage.getItem ('email_address'),
        phone_number: localStorage.getItem ('phone_number'),
        premium: localStorage.getItem ('premium'),
        userId: localStorage.getItem ('userId'),
        selectedDay: localStorage.getItem ('selectedDay'),
      });
    }
  };

  handleLogin = response => {
    try {
      localStorage.setItem ('theUser', response.data.first_name);
      localStorage.setItem ('typeOfUser', response.data.typeOfUser);
      localStorage.setItem ('first_name', response.data.first_name);
      localStorage.setItem ('email_address', response.data.email_address);
      localStorage.setItem ('phone_number', response.data.phone_number);
      localStorage.setItem ('premium', response.data.premium);
      localStorage.setItem ('userId', response.data._id);
      localStorage.setItem ('selectedDay', response.selectedDay);

      this.setState ({
        theUser: response.data.first_name,
        typeOfUser: response.data.typeOfUser,
        first_name: response.data.first_name,
        email_address: response.data.email_address,
        phone_number: response.data.phone_number,
        premium: response.data.premium,
        userId: response.data._id,
        selectedDay: null,
      });
      console.log (
        'after handleLogin setstate logging the this.state :',
        this.state
      );
    } catch (error) {
      console.log (error);
    }
  };

  handleLogout = () => {
    try {
      localStorage.clear ();
      this.setState ({
        theUser: null,
        typeOfUser: '',
        first_name: null,
        email_address: null,
        phone_number: null,
        premium: null,
        userId: null,
        selectedDay: null,
      });
    } catch (error) {
      console.log (error);
    }
  };

  selectedDayContext = selectedDayForContext => {
    console.log ('console logging selectedDayContext', selectedDayForContext);
    this.setState ({selectedDay: selectedDayForContext});
  };
  catch (error) {
    console.log (error);
  }

  render () {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          handleLogin: response => {
            this.handleLogin (response);
          },
          handleLogout: () => {
            this.handleLogout ();
          },
          checkUser: () => {
            this.checkUser ();
          },
          addUserIdToState: () => {
            this.addUserIdToState ();
          },
          selectedDayContext: () => {
            this.selectedDayContext ();
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export {MyProvider, MyContext};
