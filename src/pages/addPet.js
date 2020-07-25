import './addPet.scss';
import React from 'react';
import apiConfig from '../api-config'
import Header from './../components/header'

export default class AddPet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      type: '',
      breed: '',
      description: '',
      story: '',
      imageURL: '',
      errorMessage: ''
    }
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name === '' || this.state.gender === '' || this.state.type === '' || this.state.breed === '' || this.state.description === '' || this.state.story === '' || this.state.imageURL === '') {
      this.setState({errorMessage: 'Please enter all fields.'});
      return;
    } else {
      // clear error if there was one
      this.setState({errorMessage: ''});
    }

    let newPet = {
      name: this.state.name,
      gender: this.state.gender,
      type: this.state.type,
      breed: this.state.breed,
      description: this.state.description,
      story: this.state.story,
      imageURL: this.state.imageURL,
    }

    fetch(`${apiConfig.API_ENDPOINT}/api/pets`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newPet),
    })
      .then(res => res.json())
      .then(json => {
        // look for a 2XX response and show the user that it was successful.
        console.log(json);
      })
      .catch(e => console.log(e));
  }

  render() {
    return <>
      <Header></Header>
      <div className="wrapper add-pet">
        <h1>Add Pet</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="grid">
            <div className="col1-2">
              <div className="form-field">
                <label>Name</label>
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)}></input>
              </div>
              <div className="form-field">
                <label className="block">Gender</label>
                <input type="radio" id="male" name="gender" value="male" onChange={(e) => this.handleChange('gender', e.target.value)}></input>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" onChange={(e) => this.handleChange('gender', e.target.value)}></input>
                <label htmlFor="female">Female</label>
              </div>
              <div className="form-field">
                <label className="block">Type</label>
                <input type="radio" id="cat" name="type" value="cat" onChange={(e) => this.handleChange('type', e.target.value)}></input>
                <label htmlFor="cat">Cat</label>
                <input type="radio" id="dog" name="type" value="dog" onChange={(e) => this.handleChange('type', e.target.value)}></input>
                <label htmlFor="dog">Dog</label>
              </div>
              <div className="form-field">
                <label>Breed</label>
                <input type="text" onChange={(e) => {this.handleChange('breed', e.target.value)}}></input>
              </div>
            </div>
            <div className="col1-2">
              <div className="form-field">
                <label>Physical Description</label>
                <textarea onChange={(e) => {this.handleChange('description', e.target.value)}}></textarea>
              </div>
              <div className="form-field">
                <label>Story</label>
                <textarea onChange={(e) => {this.handleChange('story', e.target.value)}}></textarea>
              </div>
              <div className="form-field">
                <label>Image URL</label>
                <input type="text" onChange={(e) => {this.handleChange('imageURL', e.target.value)}}></input>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="large">Add Pet</button>
            <div className="error-message">{this.state.errorMessage}</div>
          </div>
        </form>
      </div>
    </>;
  }

}
