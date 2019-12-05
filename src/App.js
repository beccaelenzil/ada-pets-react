import React, { Component } from 'react';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { pets } from './data/pets.json';
//const pets = importData.pets;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petList: pets,
      currentPet: undefined,
    };
    //console.log(pets);
  }

  selectPet = (id) => {
    const pet = this.state.petList.find((pet) => pet.id == id)

    this.setState({currentPet: pet})
  }

  removePet = (id) => {
    const updatedPets = this.state.petList.filter((pet) => pet.id !== id)
    
    this.setState({petList: updatedPets})
  }

  incrementId = () =>{
    const pets = this.state.petList
    let ids = pets.map((pet) => {
      return parseInt(pet.id, 10)
    })

    const newId = Math.max(...ids) + 1
    return newId
  }

  addPet = (newPet) =>{
    newPet.id = this.incrementId()
    const updatedPets = this.state.petList.concat(newPet)
    console.log(updatedPets)

    this.setState({petList: updatedPets})
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
          <SearchBar />
        </section>
        {/* Wave 2:  Where Pet Details should appear */}
        {currentPet !== undefined ? <PetDetails currentPet = {currentPet} /> : <p>'No Pet Selected'</p>}
  
        <section className="pet-list-wrapper">
          { /* Wave 1:  Where PetList should appear */}
          <PetList pets={petList} selectCallback={this.selectPet} removeCallback={this.removePet}/>
        </section>
        <section className="new-pet-form-wrapper">
          { /* Wave 3:  Where NewPetForm should appear */}
          <NewPetForm addPetCallback={this.addPet}/>
        </section>
      </main>
    );
  }
}

export default App;


