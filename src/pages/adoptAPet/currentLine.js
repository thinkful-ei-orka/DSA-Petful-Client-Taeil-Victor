import React from 'react';

export default class CurrentLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getCurrentLine = () => {
    fetch
  }

  // if this.props.yourName is in the list, bold it.

  // every 5 seconds, remove a person and pet
  // add that person and pet to the list of adoptions (success stories)


  // if your name is the first value, run this.props.detectFirst

  // every 5 seconds after that, add a new user every 5 seconds until there are a total of 5 users

  render() {
    return <>
      <h3>Current Line</h3>
      <ul className="current-line">
        <li>Randy Lahey</li>
        <li>Trevor Cory</li>
        <li>Jim Lahey</li>
        <li><strong>Your Name</strong></li>
        <li>New Name</li>
        <li>New Name</li>
      </ul>
      <button onClick={this.props.detectFirst}>Testing first detection</button>
    </>;
  }
}
