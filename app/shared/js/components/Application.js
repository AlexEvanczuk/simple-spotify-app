import React from 'react';
import * as SpotifyClient from '../api/spotifyClient';
import * as WikipediaClient from '../api/wikipediaClient';
import SearchContainer from './SearchContainer';
import ArtistView from './ArtistView';
import AlbumView from './AlbumView';
import AboutModal from './AboutModal';
import NavigationBar from './NavigationBar';

class Application extends React.Component {
  constructor() {
    super();
    this.state = { artistSearchResults: null,
                    selectedArtist: null,
                    artistWikipediaEntry: null,
                    albumSearchResults: null,
                    showAboutModal: null };
  }

  render() {
    let { selectedArtist,
        artistWikipediaEntry,
        artistSearchResults,
        albumSearchResults } = this.state;

    let aboutModal = null;
    let navBar = <NavigationBar onOpenAbout={this.onOpenAbout.bind(this)}/>;

    let searchContainer = <SearchContainer onSearchArtist={this.onSearchArtist.bind(this)}/>;

    let artistView = (<ArtistView onSelectArtist={this.onSelectArtist.bind(this)}
                                 artistSearchResults={artistSearchResults}
                                 selectedArtist={selectedArtist}
                                 artistWikipediaEntry={artistWikipediaEntry}/>);

    let albumView = (<AlbumView onPlayAudio={this.onPlayAudio.bind(this)}
                              onStopAudio={this.onStopAudio.bind(this)}
                              albums={albumSearchResults}/>);

    if(this.state.showAboutModal) {
      aboutModal = <AboutModal onCloseAbout={this.onCloseAbout.bind(this)}/>
    }

    // Main application top level view
    return (<div>
              {aboutModal}
              <div>{navBar}</div>
              <div className='application-body'>
                {searchContainer}
                {artistView}
                {albumView}
              </div>
            </div>);
	}

  // Store search results and clear out any existing artist info
  onSearchArtist(text) {
    this.setState({albums: null, artistSearchResults: null, selectedArtist: null})
    SpotifyClient.searchArtists(text, (artistSearchResults) => { this.setState({artistSearchResults}) });
  }

  // When the user selects an artist, asynchronously load the artist information, their albums, and
  // save the selected artist
  onSelectArtist(selectedArtist) {
    let title = selectedArtist.name;
    WikipediaClient.getArticleWithTitle(title, (artistWikipediaEntry) => this.setState({artistWikipediaEntry}))
    SpotifyClient.searchAlbums(selectedArtist, (albumSearchResults) => this.setState({albumSearchResults}));
    this.setState({selectedArtist})
  }

  // Start a new audio stream
  onPlayAudio(audioUrl) {
    this.audio = new Audio(audioUrl);
    this.audio.play()
  }

  // Stop playing any audio
  onStopAudio() {
    if(this.audio) {
      this.audio.pause();
    }
  }

  // Open the about modal
  onOpenAbout() {
    this.setState({showAboutModal: true})
  }

  // Open the about modal
  onCloseAbout() {
    this.setState({showAboutModal: false})
  }
};

// Our main instructions to render the application
ReactDOM.render(<Application/>, document.getElementById('container'));