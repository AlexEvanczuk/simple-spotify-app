import React from 'react'
import SearchContainer from './search_container';
import ArtistView from './artist_view';
import AlbumView from './album_view';
import AboutModal from './about_modal';
import NavigationBar from './navigation_bar';

class Application extends React.Component {
  constructor() {
    super();
    this.state = {artistSearchResults: null,
                  selectedArtist: null,
                  artistWikipediaEntry: null,
                  albumSearchResults: null,
                  showAboutModal: null,
                  currentAudio: null};
  }

  render() {
    let selectedArtist = this.state.selectedArtist,
        artistWikipediaEntry = this.state.artistWikipediaEntry,
        artistSearchResults = this.state.artistSearchResults,
        albumSearchResults = this.state.albums,
        aboutModal = null;

    let navBar = <NavigationBar onClickAbout={this.onClickAbout.bind(this)}/>;

    let searchContainer = <SearchContainer onSearchArtist={this.onSearchArtist.bind(this)}/>;

    let artistView = (<ArtistView onSelectArtist={this.onSelectArtist.bind(this)}
                                 artistSearchResults={artistSearchResults}
                                 selectedArtist={selectedArtist}
                                 artistWikipediaEntry={artistWikipediaEntry}/>);

    let albumView = (<AlbumView onPlayAudio={this.onPlayAudio.bind(this)}
                              onStopAudio={this.onStopAudio.bind(this)}
                              albums={albumSearchResults}/>);

    if(this.state.showAboutModal) {
      aboutModal = <AboutModal/>
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
    this.searchArtists(text, this.saveArtistResults.bind(this));
    this.setState({albums: null, artistSearchResults: null, selectedArtist: null})
  }

  // When the user selects an artist, asynchronously load the artist information, their albums, and
  // save the selected artist
  onSelectArtist(selectedArtist, e) {
    e.preventDefault();
    this.getArtistInfo(selectedArtist.name, this.saveArtistInfo.bind(this));
    this.searchAlbums(selectedArtist, this.saveAlbumResults.bind(this));
    this.setState({selectedArtist: selectedArtist})
  }

  // Store saved search results
  saveAlbumResults(results) {
    this.setState({albums: results.items});
  }

  // Store saved search results
  saveArtistResults(results) {
    this.setState({artistSearchResults: results['artists']['items']})
  }

  // Store saved search results
  saveArtistInfo(results) {
    this.setState({artistWikipediaEntry: results})
  }

  // Start a new audio stream
  onPlayAudio(audioUrl) {
    let audioPreview = new Audio(audioUrl);
    audioPreview.play();
    this.setState({currentAudio: audioPreview})
  }

  // Stop playing any audio
  onStopAudio() {
    if(this.state.currentAudio) {
      this.state.currentAudio.pause();
      this.setState({currentAudio: null})
    }
  }

  // Pull the albums from a given artist
  searchArtists(artistName, saveArtistResults) {
    if(artistName.length == 0) {
      return
    }
     $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {q: artistName, type: 'artist' },
        success: saveArtistResults
      });
  }

  // Pulls HTML from Wikipedia Article with a given title
  getArtistInfo(artistName, saveArtistInfo) {
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
          action:"query",
          prop:"extracts",
          titles: artistName,
          format: "json"
      },
      xhrFields: { withCredentials: true },
      success: function(response) {
        let pages = Object.keys(response.query.pages);
        if(pages.length > 0){
          saveArtistInfo(response.query.pages[pages[0]].extract)
        }
      }
    });
  }


  // Pull the albums from a given artist
  searchAlbums(artist, saveAlbumResults) {
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + artist.id + "/albums",
      success: saveAlbumResults
    });
  }

  // Open the about modal
  onClickAbout() {
    this.setState({showAboutModal: true})
  }
};

// Our main instructions to render the application
ReactDOM.render(React.createElement(Application), document.getElementById('container'));