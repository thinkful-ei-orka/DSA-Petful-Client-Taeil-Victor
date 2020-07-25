import React from 'react';
import apiConfig from './../../api-config'

export default class CurrentLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      yourPosition: null
    }
  }

  getCurrentLine = () => {
    fetch(`${apiConfig.API_ENDPOINT}/api/people`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({people: json});
      })
      .catch(e => console.log(e));
  }

  checkTimer = () => {
    setTimeout(() => {
      this.checkState();
      this.checkTimer();
    }, 5000)
  }

  checkState = () => {
    console.log('checking');
    if (this.state.yourPosition > 1) { // if your position is greater than 1, remove one person every 5 seconds
      fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
        })
        .catch(e => console.log(e));
    } else if (this.state.yourPosition === 1 && this.state.people.length < 5) { // if your position is = 1, add someone every 5 seconds until there are 5 people
      let newPerson = { user_name: 'Random New Name'}
      fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPerson),
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
        })
        .catch(e => console.log(e));
    } else {
      // check for an update in the line
      this.getCurrentLine();
    }
    // do nothing if your name is not in the queue yet or if your name has left the queue
  }

  // if this.props.yourName is in the list, bold it.

  // every 5 seconds, remove a person and pet
  // add that person and pet to the list of adoptions (success stories)


  // if your name is the first value, run this.props.detectFirst

  // every 5 seconds after that, add a new user every 5 seconds until there are a total of 5 users

  componentDidMount() {
    this.getCurrentLine();
    this.checkTimer();
  }

  render() {
    let people = [];
    this.state.people.forEach((person, i) => {
      if (person === this.props.yourName) {
        people.push(<li key={i}><strong>{person}</strong></li>);
        this.setState({yourPosition: i + 1})
      } else {
        people.push(<li key={i}>{person}</li>)
      }
    });

    return <>
      <h3>Current Line</h3>
      <ul className="current-line">
        {people}
      </ul>
      <button onClick={this.props.detectFirst}>Testing first detection</button>
    </>;
  }
}
