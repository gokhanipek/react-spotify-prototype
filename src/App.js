import React, { Component } from 'react';
import './App.css';


let defaultTextColor = '#fff'
let defaultStyle = {
  color: defaultTextColor
}

let fakeServerData = {
  user: {
    name: 'React',
    playlists: [
      {
        name: 'My favs',
        songs: [{name: 'Beat it', duration: 1166}, {name: 'makaroni', duration: 1423}, {name: 'rockstar', duration: 5422 }]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'Beat it', duration: 1166}, {name: 'makaroni', duration: 1423}, {name: 'rockstar', duration: 2353 }]
      },
      {
        name: 'Rap Music',
        songs: [{name: 'Beat it', duration: 1166}, {name: 'makaroni', duration: 1423}, {name: 'rockstar', duration: 1111 }]
      }
    ]
  }
}

class PlaylistCounterAggragate extends Component {
  render(){
    return(
      <div style={{display: 'inline-block', width: '40%'}} >
        <h2 style={{...defaultStyle}}>{this.props.playlists.length} Playlist </h2>
      </div>

    )
  }
}


class HoursCounterAggragate extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=> {
      return eachPlaylist.songs.concat(eachPlaylist.songs)
    }, []) 
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{...defaultStyle, width: '40%'}} >
        <h2> {Math.round(totalDuration/60)} Hours </h2>
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
      <div style={{...defaultStyle, display: 'inline-block', width: '20%'}}>
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
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({ serverData: fakeServerData }) 
    }, 2000)

  }
  render() {
    let name = 'Gokhan'
    let green  ='#4CE0D2'
    let fullLength = '100%'

    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
          <h1 style={{ ...defaultStyle, 'font-size': '54px'}}>
            {
              this.state.serverData.user.name
            } First App
          </h1>
        }
        <PlaylistCounterAggragate playlists={this.state.serverData.user.playlists }/>
        <HoursCounterAggragate playlists={this.state.serverData.user.playlists }/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        </div> : <div style= {{...defaultStyle}}>loading...</div>
        }
      </div>
    );
  }
}

export default App;
