import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import queryString from 'query-string';

class PlaylistCounter extends Component {
  render() {
    return (
        <a className="nav-link">{this.props.playlists.length} Playlist </a>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} placeholder="Search"></input>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    const imgStyle = {
      height: 'auto',
      width: '100%', 
      display: 'block'
    }
    return (

          <div className="col-md-3 ">
            <div className="card mb-3">
              <h3 className="card-header">{playlist.name}</h3>
              <img style={imgStyle} src={playlist.imageUrl} alt="Card"></img>
              <ul className="list-group list-group-flush">
                  {playlist.songs.map(song => (
                    <li className="list-group-item">{song.name}</li>
                  ))}
              </ul>
            <div className="card-footer text-muted">
              2 days ago
            </div>
          </div>
        </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    console.log(accessToken);
    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: {
            name: data.display_name,
          },
        });
      });

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
      .then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: 'Bearer ' + accessToken },
          });
          let trackDataPromise = responsePromise.then(response => response.json());
          return trackDataPromise;
        });
        let allTracksDatasPromises = Promise.all(trackDataPromises);
        let playlistsPromise = allTracksDatasPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000,
              }));
          });
          return playlists;
        });
        return playlistsPromise;
      })
      .then(playlists =>
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: item.trackDatas.slice(0, 5).map(trackData => ({
                name: trackData.name,
              })),
            };
          }),
        }),
      );
  }

  render() {
    let playlistToRender =
      this.state && this.state.playlists
        ? this.state.playlists.filter(playlist => {
            let matchesPlaylist = playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase());
            let matchesSong = playlist.songs.find(song =>
              song.name.toLowerCase().includes(this.state.filterString.toLowerCase()),
            );
            return matchesPlaylist || matchesSong;
          })
        : [];
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-30">
              <div className="collapse navbar-collapse">
              <a class="navbar-brand">{this.state.user.name}'s Playlists</a>
                <PlaylistCounter playlists={playlistToRender} />
                <Filter 
                  onTextChange={text => {
                    this.setState({ filterString: text });
                  }}
                />
              </div>
              </nav>
              <div className="container">
                <div className="col-md-12">
                    <div className="row">
                      { playlistToRender.map(playlist => ( <Playlist playlist={playlist} /> ))}
                    </div>
                  </div>
              </div>
          </div>
        ) : (
          <button
            onClick={() => {
              window.location = window.location.href.includes('localhost')
                ? 'http://localhost:8888/login'
                : 'https://react-spotify-backend.herokuapp.com/login';
            }}
            className="button-dark"
          >
            Sign in with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
