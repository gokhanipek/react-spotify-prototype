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
        songs: [{name: 'Evidence', duration: 1166}, {name: 'Chrome', duration: 1423}, {name: 'For My Demons', duration: 2353 }]
      },
      {
        name: 'Rap Music',
        songs: [{name: 'Pool of Booze', duration: 1166}, {name: 'Pearl Lady', duration: 1423}, {name: 'For Evight', duration: 1111 }]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render(){
    return(
      <div style={{display: 'inline-block', width: '40%'}} >
        <h2 style={{...defaultStyle}}>{this.props.playlists.length} Playlist </h2>
      </div>

    )
  }
}


class HoursCounter extends Component {
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
        <input type="text" onKeyUp={  event =>
           this.props.onTextChange(event.target.value) }/> 
      </div>
    )
  }
}

class Playlist extends Component {
  render(){
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, display: 'inline-block', width: '20%'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>

        </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
      

    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({ serverData: fakeServerData }) 
    }, 1000)

  }
  render() {
    let playlistElements = [];
    if(this.state.serverData.user){
      for (let i = 0; i <this.state.serverData.user.playlists.length; i++) {
        let playlist = this.state.serverData.user.playlists[i]
        playlistElements.push(<Playlist playlist= {playlist}/>)
        
      }
    }
    this.state.serverData.playlists

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
          <PlaylistCounter playlists={this.state.serverData.user.playlists }/>
          <HoursCounter playlists={this.state.serverData.user.playlists }/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playlist => 
            <Playlist playlist={playlist} />
            )}
          
          </div> : <h1 style= {{...defaultStyle}}>loading...</h1>
        }
      </div>
    );
  }
}

export default App;
 