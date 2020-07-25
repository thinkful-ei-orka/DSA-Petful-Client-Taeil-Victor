import './successStories.scss';
import React from 'react';
import apiConfig from '../api-config'
import Header from '../components/header';
import { Link } from 'react-router-dom';

export default class SuccessStories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adoptions: []
    }
  }

  async componentDidMount() {
    fetch(`${apiConfig.API_ENDPOINT}/api/adopted`)
      .then(res => res.json())
      .then(json => {
        // convert linked list to array
        let adoptionsArray = [];
        let node = json.first;

        while (node !== undefined) {
          adoptionsArray.push(node.value);
          node = node.next;
        }

        this.setState({ adoptions: adoptionsArray })
      })
      .catch(e => console.log(e))
  }

  render() {
    let adoptions = [];

    this.state.adoptions.forEach((newAdoption, i) => {
      adoptions.push(
        <div className="col1-3 adoption" key={i}>
          <img src={newAdoption.imageURL} alt={newAdoption.description}></img>
          <div className="name">{newAdoption.name} adopted by {newAdoption.newOwner}</div>
        </div>
      )
    })
    // add two ghost columns to make sure the last row aligns to grid
    adoptions.push(<div className="col1-3"></div>);
    adoptions.push(<div className="col1-3"></div>);

    return <>
      <Header />
      <main>
        <div className="wrapper success-stories">
          <h1>Success Stories</h1>
          {this.state.adoptions.length < 1 &&
            <h3 className='no-adoption-message'>No pets have been adopted yet. Adopt one today!</h3>
          }
          <div className="grid">{adoptions}</div>
          <div className="button-container"><Link to="/adopt-a-pet" className="btn large">Adopt a Pet</Link></div>
        </div>
      </main>
    </>;
  }
}
