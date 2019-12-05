import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPetForm.css'

class NewPetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      species: '',
      about: '',
      location: '',
      images: ''
    };
  }

  onFormSubmit = (event) => {
    event.preventDefault(); 

    const newPet = {
      name: this.state.name,
      species: this.state.species,
      about: this.state.about,
      location: this.state.location,
      images: [this.state.images],
    }

    this.setState({
      name: '',
      species: '',
      about: '',
      location: '',
      images: ''
    });

    this.props.addPetCallback(newPet)

  }

  onInputChange = (event) => {
    const updatedState = {};
  
    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;

    this.setState(updatedState);
  }
  


  render() {
    return (
      <form  className="new-pet-form" onSubmit={this.onFormSubmit}>
        <h3>Add a Pet</h3>
        <label htmlFor="name">Name:</label>
        <input
          onChange={this.onInputChange}
          value={this.state.name}
          name="name"
        />
        <label htmlFor="species">Species:</label>
        <input
          onChange={this.onInputChange}
          value={this.state.species}
          name="species"
        />
        <label htmlFor="location">Location:</label>
        <input
          onChange={this.onInputChange}
          value={this.state.location}
          name="location"
        />
        <label htmlFor="images">Image URL:</label>
        <textarea
          onChange={this.onInputChange}
          value={this.state.images}
          name="images"
        />
        <label htmlFor="about">About:</label>
        <textarea
          onChange={this.onInputChange}
          value={this.state.about}
          name="about"
        />
        <input 
          className="btn btn-success new-pet-form--submit" 
          type="submit" 
          name="submit" 
          value="Add a Pet" 
        />
      </form>
    );
  }


}

NewPetForm.propTypes = {
  addPetCallback: PropTypes.func.isRequired,
};

export default NewPetForm;

/*id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired, 
  species: PropTypes.string.isRequired, 
  about: PropTypes.string, 
  location: PropTypes.string,
  */