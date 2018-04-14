import React, { Component } from 'react';
import './App.css';


let defaultTextColor = '#fff'
let defaultStyle = {
  color: defaultTextColor
}
class Aggragate extends Component {
  render(){
    return(
      <div style={{display: 'inline-block', width: '40%'}} >
        <h2 style={{...defaultStyle}}>Number Text </h2>
      </div>

    )
  }
}

class Filter extends Component {
  render(){
    return(
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text"/>
        Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    return(
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>  
        </ul>

        </div>
    )
  }
}

class App extends Component {

  render() {
    let name = 'Gokhan'
    let green  ='#4CE0D2'
    let fullLength = '100%'

    return (
      <div className="App">
        <h1 style={{ ...defaultStyle, 'font-size': '54px'}}>Title</h1>
        <Aggragate/>
        <Aggragate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        
      </div>
    );
  }
}

export default App;
