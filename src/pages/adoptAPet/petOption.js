import React from 'react';

export default class PetOption extends React.Component {
  render() {
    return <>
      <div className="pet-option">
        <h2>{this.props.name}</h2>
        <img src={this.props.imageURL} alt={this.props.description}></img>
        <p>{this.props.description}</p>
        <p>
          {this.props.gender} {this.props.breed}<br />
          {this.props.age} years old<br />
          {this.props.story}
        </p>
        <button onClick={this.props.handleSelect}>Adopt {this.props.name}!</button>
      </div>
    </>;
  }
}
