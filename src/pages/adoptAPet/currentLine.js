import React from 'react';

export default class CurrentLine extends React.Component {
  render() {
    let people = [];
    this.props.currentLine.forEach((person, i) => {
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
    </>;
  }
}
