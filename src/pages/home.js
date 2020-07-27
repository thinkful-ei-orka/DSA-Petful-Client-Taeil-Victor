import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginClass: 'hidden',
      username: '',
      password: '',
      errorMessage: '',
      loggedIn: false
    }
  }

  toggleLogin = () => {
    console.log('toggling');

    if (this.state.loginClass === 'hidden') {
      this.setState({
        loginClass: ''
      });
    } else {
      this.setState({
        loginClass: 'hidden'
      });
    }

    console.log(this.state);
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({errorMessage: 'Please enter all fields.'});
      window.scrollTo(0,document.body.scrollHeight);
      return;
    }

    if (this.state.username === 'petful' && this.state.password === 'ilovepets') {
      window.location.href = "/manage-pets";
      this.setState({loggedIn: true})
    } else {
      this.setState({errorMessage: 'Your credentials are incorrect.'});
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  render() {
    let hasError = ''
    if (this.state.errorMessage !== '') {
      hasError = 'has-error';
    }

    return <>
      <main>
        <section className="hero-image">
          <div className="image-container">
            <div className="content"></div>
          </div>
        </section>
        <section className="welcome-message">
          <div className="wrapper">
            <h1>Welcome to Petful!</h1>
            {/* <p>Quis Lorem et irure quis irure ad. Mollit labore laboris mollit et cupidatat aliqua est enim id est. Sint anim dolore culpa anim incididunt id laboris cupidatat id quis. Dolor exercitation dolore mollit fugiat. Culpa aliquip cillum in in.</p> */}
            <ul>
              <li>There are the only two types of animals in the shelter, cats and dogs.</li>
              <li>The adoption process works strictly on a first in-first out basis.</li>
              <li>People can choose to adopt either a cat, a dog, or both.</li>
              <li>People can only adopt the pets who have been at the shelter for the longest.</li>
            </ul>
            <Link to="/adopt-a-pet" className="btn large">Adopt a Pet</Link>
          </div>
        </section>
        <section className="home-footer">
          <div className="wrapper">
            <Link to="/success-stories" className="btn">Success Stories</Link>
            <button onClick={this.toggleLogin}>Log In</button>
          </div>
        </section>
        <section className={`login-form ${this.state.loginClass} ${hasError}`}>
          <div className="wrapper">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="form-field inline">
                <label>Username</label>
                <input type="text" value={this.state.username} onChange={(e) => this.handleChange('username', e.target.value)}></input>
              </div>
              <div className="form-field inline">
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={(e) => this.handleChange('password', e.target.value)}></input>
              </div>
              <button type="submit">Log In</button>
            </form>
            <div className="error-message">{this.state.errorMessage}</div>
          </div>
        </section>
      </main>
    </>;
  };
}
