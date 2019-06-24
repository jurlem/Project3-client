import React, {Component} from 'react';
import axios from 'axios';

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
        selectedDay: response.data.selectedDay,
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

  selectedDayContext = selectedDay => {
    console.log ('console logging selectedDayContext', selectedDay);
    this.setState (prevState => ({...prevState, selectedDay}));
  };
  catch (error) {
    console.log (error);
  }

  // shows in Reminders comp reminders per selected day
  remindersPerDay = selectedDay => {
    const userId = this.state.userId;
    const date = selectedDay;

    //selectedDay Into date format selectedDad.intoDate
    axios
      .get (
        `http://localhost:6001/reminders/selectedday?userId=${userId}&date=${date}`
      )
      .then (result => {
        console.log (date);
        console.log ('LOGGING RESULT from reminders/USERID/DATE ', result.data);

        //kuidas ma siit saan renderdada tulemust Reminders tab'i?
      })
      .catch (err => {
        console.log (err);
      });
  };

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
          selectedDayContext: this.selectedDayContext,
          remindersPerDay: this.remindersPerDay,
        }}
      >
        {/* </MyContext.Provider>/<MyContext.Provider value={{ state: this.state, updateReturnMessage: this.updateReturnMessage }}> */}
        {/* https://stackoverflow.com/questions/50502664/how-to-update-the-context-value-in-provider-from-the-consumer */}
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export {MyProvider, MyContext};
