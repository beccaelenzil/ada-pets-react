import React, { Component } from 'react';
import axios from 'axios';

import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petList: [],
      currentPet: undefined,
      originalPets: [],
    };
  }

  componentDidMount () {
    axios.get('http://localhost:2999/pets')
      .then((response) => {
        this.setState({
          petList: response.data,
          originalPets: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        })
      });
  }

  selectPet = (petId) => {
    const { petList } = this.state;

    const currentPet = petList.find((pet) => {
      return pet.id === petId;
    });

    this.setState({ currentPet, });
  }

  deletePet = (petId) => {
    axios.delete(`http://localhost:2999/pets/${ petId }`)
      .then((response) => {
        const petList = this.state.petList.filter((pet) => {
          return pet.id !== petId;
        });

        this.setState({
          petList,
          originalPets: petList,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
  }

  addPet = (pet) => {

    const { petList } = this.state;
    const petIds = petList.map((pet) => pet.id);
    const maxId = Math.max(...petIds);
    pet.id = maxId + 1;
    petList.push(pet);
    console.log('adding', pet);

    this.setState(petList);
  }

  filterPets = (filterTerm) => {
    const petList = this.state.originalPets.filter((pet) => {
      const text = (pet.name + ' ' + pet.about + ' ' + pet.location + ' ' + pet.species).toUpperCase();

      return text.includes(filterTerm.toUpperCase());
    });

    this.setState({ petList, });
  }


  render () {
    const { currentPet, petList } = this.state;

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
        </header>
        <section className="search-bar-wrapper">
          { /* Wave 4:  Place to add the SearchBar component */}
          <SearchBar searchChangeCallback={this.filterPets} />
        </section>
        { /* Wave 2:  Where Pet Details should appear */}
        {currentPet ? <PetDetails currentPet={currentPet} /> : ''}
        <section className="pet-list-wrapper">
          { /* Wave 1:  Where PetList should appear */}
          <PetList
            pets={petList}
            selectPetCallback={this.selectPet}
            deletePetCallback={this.deletePet}
          />
        </section>
        <section className="new-pet-form-wrapper">
          { /* Wave 3:  Where NewPetForm should appear */}
          <NewPetForm addPetCallback={this.addPet} />
        </section>
      </main>
    );
  }
}

export default App;
