import React from 'react'

export default class GetInLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourName: '',
      errorMessage: ''
    };
  }

  handleChange = (e) => {
    this.setState({yourName: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.yourName === '') {
      this.setState({errorMessage: 'Please enter a name.'});
      return;
    }

    this.props.handleNameSubmit(this.state.yourName);
  }

  render() {
    return <>
      <p>There is currently a line to adopt a pet.</p>
      <p>To get in line, enter your name here. You'll be able to adopt a pet once you have reached the front of the line.</p>
      <form onSubmit={this.handleSubmit}>
        <label>Your Name</label>
        <input type="text" value={this.state.yourName} onChange={this.handleChange}></input>
        <button type="submit">Get in line</button>
        <div className="error-message">{this.state.errorMessage}</div>
      </form>
    </>;
  }
}
