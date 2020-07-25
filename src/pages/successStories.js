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
        this.setState({ adoptions: json })
      })
      .catch(e => console.log(e))
  }

  render() {
    let adoptions = [];
    this.state.adoptions.forEach((newAdoption) => {
      adoptions.push(
        <li key={newAdoption}>
          <img src={newAdoption.imageURL}
            alt='Adopted pet'
            className='adopted-image' />
          <p>{newAdoption.name}, adopted by {newAdoption.newOwner}</p>
        </li>
      )
    })

    return <>
      <Header />
      <ul className='adopted-animal'>
        {this.state.adoptions.length > 0 ? adoptions : <h3 className='no-adoption-message'>No pets have been adopted yet. Adopt one today!</h3>}
      </ul>
      <Link to="/adopt-a-pet" className="btn large">Adopt a Pet</Link>
    </>;
  }
}
