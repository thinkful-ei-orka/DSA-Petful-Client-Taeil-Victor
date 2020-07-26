import './managePets.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../api-config'
import Header from '../components/header';

export default class ManagePets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      dogs: []
    }
  }

  componentDidMount() {
    fetch(`${apiConfig.API_ENDPOINT}/api/cats/all`)
      .then(res => res.json())
      .then(json => {
        this.setState({cats: json});
      })
      .catch(e => console.log(e));

    fetch(`${apiConfig.API_ENDPOINT}/api/dogs/all`)
      .then(res => res.json())
      .then(json => {
        this.setState({dogs: json});
      })
      .catch(e => console.log(e));
  }

  render() {
    let cats = [];
    let dogs = [];

    this.state.cats.forEach((cat) => {
      cats.push(
        <div className="col1-3 cat-dog">
          <img src={cat.imageURL} alt={cat.description}></img>
          <div className="name-remove">
            <div className="name">{cat.name}</div>
            {/* disabling the remove button for now */}
            {/* <button className="red">Remove</button> */}
          </div>
        </div>);
    })
    // add two ghost columns to make sure the last row aligns to grid
    cats.push(<div className="col1-3"></div>);
    cats.push(<div className="col1-3"></div>);

    this.state.dogs.forEach((dog) => {
      dogs.push(
        <div className="col1-3 cat-dog">
          <img src={dog.imageURL} alt={dog.description}></img>
          <div className="name-remove">
            <div className="name">{dog.name}</div>
            {/* disabling the remove button for now */}
            {/* <button className="red">Remove</button> */}
          </div>
        </div>);
    })
    // add two ghost columns to make sure the last row aligns to grid
    dogs.push(<div className="col1-3"></div>);
    dogs.push(<div className="col1-3"></div>);

    return <>
    <Header />
      <div className="wrapper manage-pets">
        <h1>Manage Pets <Link to="/add-pet" className="btn">Add Pet</Link></h1>
        <section>
          <h2>Cats</h2>
          <div className="grid">{cats}</div>
        </section>
        <section>
          <h2>Dogs</h2>
          <div className="grid">{dogs}</div>
        </section>
      </div>
    </>;
  }

}
