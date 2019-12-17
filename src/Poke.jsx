import React from 'react';
import './App.css';
import { Component } from 'react';

export default class Poke extends Component {


  render() {
    return (
      <div className="img_div">
        <div >Name : {this.props.name}  </div>
        <img style={{ width: '300px', height: '200px', marginRight: '50px' }} src={this.props.url} >
          {/* alt = {'image not laoding from API for url' + this.props.url + parseInt(this.props.index +1) + '.png'} > */}
        </img>

      </div>
    );
  }
}