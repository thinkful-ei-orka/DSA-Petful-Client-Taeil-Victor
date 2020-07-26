import React from 'react';

export default class PetOption extends React.Component {
  render() {
    return <>
      <div className="pet-option">
        <h2>{this.props.pet.name}</h2>
        <img src={this.props.pet.imageURL} alt={this.props.pet.description}></img>
        <p>{this.props.pet.description}</p>
        <p>
          {this.props.pet.gender} {this.props.pet.breed}<br />
          {this.props.pet.age} years old<br />
          {this.props.pet.story}
        </p>
        <button onClick={(e) => this.props.handleSelect(this.props.type)}>Adopt {this.props.pet.name}!</button>
      </div>
    </>;
  }
}
