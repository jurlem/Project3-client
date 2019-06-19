import React, {Component} from 'react';

export default class TestComponent extends Component {
  test = () => {
    this.props.handleLogin ({
      data: {
        first_name: 'TEST',
        typeOfUser: 'TEST USER',
      },
    });
  };
  render () {
    return (
      <div onClick={this.test}>
        test component
      </div>
    );
  }
}
