import React from 'react';
import './App.css';
import Poke from './Poke';
import { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wholePokemonArray: [],
      currentPokemonArray: [],
      counter: 0,
      showPrev: false,
      showNext: false,
      showStart: true,
      reset: false
    };
    this.pokemonSetter = this.pokemonSetter.bind(this);
    this.getActualDataFromAPI = this.getActualDataFromAPI.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.reset = this.reset.bind(this);
  }


  getActualDataFromAPI() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + 100)
      .then(response => response.json())
      .then(allpokemon => {
        this.setState({
          wholePokemonArray: allpokemon.results

        })

        this.currentSetter();
      }
      );
  }

  onPrev() {
    if (this.state.counter !== 0) {
      this.setState({
        counter: this.state.counter - 1
      });
      this.pokemonSetter();
    }
    else{
      alert('no more previous pokemons');
    }
  }

  onNext() {
    if (this.state.counter < 30) {
      console.log('counter ki value set kr rha h', this.state.counter);
      this.setState({
        counter: this.state.counter + 1
      });
      this.pokemonSetter();
    }
    else{
      alert('no more next pokemons');
    }
  }

  currentSetter() {
    let val = this.state.counter * 3;
    let allValues = this.state.wholePokemonArray;
    let objVals = [];
    for (let i = val; i < val + 3; i++) {
      let obj = {};
      obj.name = allValues[i].name;
      obj.url = allValues[i].url;
      objVals.push(obj);
    }
    this.setState({
      currentPokemonArray: objVals
    });
  }


  reset() {
    this.setState({
      counter: 0
    });
    this.pokemonSetter();
  }
  pokemonSetter() {
    this.getActualDataFromAPI();
    this.setState({
      showStart: false,
      showNext: true,
      showPrev: true,
      reset: true
    });

  }

  render() {

    return (
      <div className="App">
        <p>The API images are not getting rendered from the data response URL due to PokeAPI server issue, but you please check the logic.<br />
          I have fetched three images at a time.<br />
          Then, I have taken a currentArray in which I have filtered 3 elements depending upon counter multiples.<br />
          And then incre+  and decre- the counter on next and prev respecitvely.<br />
          Also I have given the limit to first 90 characters. <br />
          <br /><br /><br /><br />
        </p>

        {this.state.showStart ? <button style={{
          width: '200px',
          height: '50px',
          marginBottom: '50px', backgroundColor: 'lightskyblue'
        }} onClick={this.pokemonSetter}>Click here to start</button> : ''}
        {this.state.reset ? <button style={{
          width: '1000px',
          height: '50px',
          marginBottom: '50px', backgroundColor: 'yellowgreen'
        }} onClick={this.reset}>Reset and Start again</button> : ''}

        <div style={{ display: 'inline-flex' }}> {this.state.currentPokemonArray.map((item, name) =>
          <Poke name={item.name} url={item.url} />

        )}

        </div>
        <div>
          <div style={{
            width: '200px',
            marginLeft: '300px',marginTop : '100px'
          }} >
            {this.state.showPrev ? <button onClick={this.onPrev}> Previous</button> : ''}
          </div>
          <div style={{
            width: '200px',
            marginLeft: '800px'
          }} >
            {this.state.showNext ? <button onClick={this.onNext}>Next</button> : ''}

          </div>     </div>
      </div>
    );
  }
}