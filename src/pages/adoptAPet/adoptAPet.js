import './adoptAPet.scss';
import React from 'react';
import apiConfig from './../../api-config'

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
      currentLine: [],
      yourPosition: null,
      cat: {},
      dog: {},
      selectedPet: {}
    }

    // Page States
    // 0: User is not in line
    // 1: User is in line
    // 2: User is first in line
    // 3: User adopted a pet
  }

  // set your name, add it to the list, and start the 5 second timer
  handleNameSubmit = (name) => {
    let yourData = {user_name: name};

    fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(yourData),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          pageState: 1,
          yourName: name
        });

        this.getCurrentLine();
        this.getPets();
        this.checkLineTimer();
      })
      .catch(e => console.log(e));
  }

  // get the current line and find your position in the line
  getCurrentLine = () => {
    fetch(`${apiConfig.API_ENDPOINT}/api/people`)
      .then(res => res.json())
      .then(json => {
        let yourPosition;
        for (let i = 0; i < json.length; i++) {
          if (json[i] === this.state.yourName) {
            yourPosition = i + 1;
          }
        }
        this.setState({
          currentLine: json,
          yourPosition: yourPosition
        });
        // if first in line, allow adoption and transition to next state
        if (this.state.yourPosition === 1 && this.state.pageState === 1) {
          this.setState({
            pageState: 2,
          });
        }
      })
      .catch(e => console.log(e));
  }

  getPets() {
    fetch(`${apiConfig.API_ENDPOINT}/api/cats/`)
      .then(res => res.json())
      .then(json => {
        this.setState({cat: json})
        return json;
      })
      .catch(e => console.log(e));

    fetch(`${apiConfig.API_ENDPOINT}/api/dogs/`)
      .then(res => res.json())
      .then(json => {
        this.setState({dog: json})
        return json;
      })
      .catch(e => console.log(e));
  }

  // check the state of the line every 5 seconds
  checkLineTimer = () => {
    setTimeout(() => {
      this.checkTheLine();
      this.checkLineTimer(); // check in another 5 seconds
    }, 5000)
  }

  // check your position in line and do the right thing
  checkTheLine = () => {
    console.log('checking');
    // if your position is greater than 1, remove one person every 5 seconds
    if (this.state.yourPosition > 1) {
      this.removePetAndOwner();
    } else if (this.state.currentLine.length < 5) { // if you're first in line, add someone every 5 seconds until there are 5 people
      let randomNames = ['Clarke Forster', 'Roshan Hutchings', 'Rianne Snow', 'Maximilian Rice', 'Lacey-May Calhoun', 'Axl Chadwick', 'Frederic Kennedy', 'Earl Morrison', 'Areeba Sadler', 'Madelyn Whitehead', 'Hania Mcdermott', 'Zishan Lister', 'Sameera Silva', 'Izaan Cooper', 'Dawson Stewart'];

      let newPerson = { user_name: randomNames[Math.floor(Math.random() * randomNames.length)] }

      fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPerson),
      })
        .then(res => res.json())
        .then(json => {
          this.getCurrentLine();
        })
        .catch(e => console.log(e));
    }
  }

  removePetAndOwner() {
    // note: reomving a pet also removes the owner
    let petOption = Math.floor(Math.random()*2);
    if (petOption === 0) {
      console.log('removing dog')
      fetch(`${apiConfig.API_ENDPOINT}/api/dogs`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then(res => {
          if (res.ok) {
            this.getCurrentLine();
            this.getPets();
          }
        })
        // .then(json => {
        //   console.log(json);
        //   this.removeOwner();
        // })
        .catch(e => console.log(e));
    } else {
      console.log('removing cat');
      fetch(`${apiConfig.API_ENDPOINT}/api/cats`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then(res => {
          if (res.ok) {
            this.getCurrentLine();
            this.getPets();
          }
        })
        // .then(json => {
        //   console.log(json);
        //   this.removeOwner();
        // })
        .catch(e => console.log(e));
    }
  }

  // removeOwner() {
  //   fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify()
  //   })
  //   .then(res => {
  //     // console.log(res);
  //     this.getCurrentLine();
  //     this.getPets();
  //   })
  //   .catch(e => console.log(e));
  // }

  handleSelect = (type) => {
    // make a call to remove pet from adoption
    if (type === 'dog') {
      fetch(`${apiConfig.API_ENDPOINT}/api/dogs`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then(res => {
          if (res.ok) {
            this.getCurrentLine();
          }
        })
        .catch(e => console.log(e));
    }
    else if (type === 'cat') {
      fetch(`${apiConfig.API_ENDPOINT}/api/cats`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(),
      })
      .then(res => {
        if (res.ok) {
          this.getCurrentLine();
        }
      })
        .catch(e => console.log(e));
    }
    // note: removing a cat or dog also removes a person
    // fetch(`${apiConfig.API_ENDPOINT}/api/people`, {
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify()
    // })
    // .then(res => {
    //   this.getCurrentLine();
    //   this.getPets();
    //   this.checkLineTimer();
    // })
    // .catch(e => console.log(e));

    this.setState({
      pageState: 3,
      selectedPet: this.state[type]
    })
  }

  componentDidMount() {
    this.getCurrentLine();
    this.getPets();
  }

  render() {
    let title = '';
    let leftContent;
    let petSelection;

    // Page Title
    if (this.state.pageState === 3) {
      title = "Thank You!";
    } else {
      title = "Adopt a Pet";
      petSelection =
        <div className="grid">
          <div className="col1-2"><PetOption handleSelect={this.handleSelect} pet={this.state.cat} type="cat" pageState={this.state.pageState}></PetOption></div>
          <div className="col1-2"><PetOption handleSelect={this.handleSelect} pet={this.state.dog} type="dog" pageState={this.state.pageState}></PetOption></div>
        </div>;
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
        leftContent = <p>It's your turn! Would you like to adopt {this.state.cat.name} or {this.state.dog.name}?</p>;
        break;
      case 3:
        leftContent = <><p>Thank you for adopting {this.state.selectedPet.name}!</p><div><img src={this.state.selectedPet.imageURL} alt={this.state.selectedPet.description}></img></div></>;
        break;
      default:
        leftContent = <p>Welcome! You must enter the line to adopt a pet. We are not accepting anyone at the moment. Please come back later!</p>
    };

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
              <CurrentLine currentLine={this.state.currentLine} yourName={this.state.yourName} detectFirst={this.detectFirst}></CurrentLine>
            </div>
          </div>
          {petSelection}
        </div>

      </main>
    </>;
  };

}
