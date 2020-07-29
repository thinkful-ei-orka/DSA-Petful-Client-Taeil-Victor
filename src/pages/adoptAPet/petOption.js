import React from 'react';

export default class PetOption extends React.Component {
  render() {
    let button;

    if (this.props.pageState === 2) {
      console.log('show button');
      button = <button onClick={(e) => this.props.handleSelect(this.props.type)}>Adopt {this.props.pet.name}!</button>;
    }

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
        {button}
      </div>
    </>;
  }
}
