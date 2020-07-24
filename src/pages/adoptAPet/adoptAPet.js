import React from 'react'

import Header from '../../components/header';
import GetInLine from './getInLine';
import CurrentLine from './currentLine';
import PetOption from './petOption';

export default class AdoptAPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 0,
      yourName: '',
      pet1: {},
      pet2: {},
      selectedPet: {}
    }

    // Page States
    // 0: User is not in line
    // 1: User is in line
    // 2: User is first in line
    // 3: User adopted a pet
  }

  handleNameSubmit = (name) => {
    this.setState({
      pageState: 1,
      yourName: name
    })
  }

  detectFirst = () => {
    // make a call to get the first cat and first dog
    // fetch()
    //   .then(() => {
    //     this.setState({
    //       pageState: 2,
    //       pet1: {},
    //       pet2: {}
    //     })
    //   })

    this.setState({
      pageState: 2,
      pet1: {},
      pet2: {}
    })
  }

  handleSelect = () => {
    // make a call to remove pet from adoption
    // remove name from people list
    // replace the pet with another pet
    // add adopted pet and your name to a list of adoptions (success story)

    this.setState({
      pageState: 3,
      selectedPet: {}
    })
  }

  render() {
    let title = '';
    let leftContent;
    let chooseAPet;

    // Page Title
    if (this.state.pageState === 3) {
      title = "Thank You!";
    } else {
      title = "Adopt a Pet";
    }

    // Left Content
    switch (this.state.pageState) {
      case 0:
        leftContent = <GetInLine handleNameSubmit={this.handleNameSubmit}></GetInLine>;
        break;
      case 1:
        leftContent = <><p>You are in line to adopt a pet.</p><p>You will be able to adopt a pet once you have reached the front of the line.</p></>;
        break;
      case 2:
        leftContent = <p>It's your turn! Would you like to adopt {this.state.pet1.name} or {this.state.pet2.name}?</p>;
        break;
      case 3:
        leftContent = <><p>Thank you for adopting {this.state.selectedPet.name}!</p><div><img src={this.state.selectedPet.imageURL} alt={this.state.selectedPet.description}></img></div></>;
        break;
      default:
        leftContent = <p>Welcome! You must enter the line to adopt a pet. We are not accepting anyone at the moment. Please come back later!</p>
    };

    // Choose a Pet
    if (this.state.pageState === 2) {
      chooseAPet = <div className="grid">
        <div className="col1-2"><PetOption handleSelect={this.handleSelect} pet={this.state.pet1}></PetOption></div>
        <div className="col1-2"><PetOption handleSelect={this.handleSelect} pet={this.state.pet2}></PetOption></div>
      </div>;
    }

    return <>
      <Header></Header>
      <main>
        <div className="wrapper">
          <h1>{title}</h1>
          <div className="grid">
            <div className="col1-2">
              {leftContent}
            </div>
            <div className="col1-2">
              <CurrentLine yourName={this.state.yourName} detectFirst={this.detectFirst}></CurrentLine>
            </div>
          </div>
          {chooseAPet}
        </div>

      </main>
    </>;
  };

}
