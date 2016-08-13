import React from 'react'
import SearchContainer from './search_container';
import ArtistView from './artist_view';
import AlbumView from './album_view';
import NavigationBar from './navigation_bar';

class Application extends React.Component {
  constructor() {
    super()
    this.state = {searchQuery: null,
                  artistSearchResults: null,
                  selectedArtist: null,
                  artistWikipediaEntry: null,
                  albums: null,
                  showTrackList: false,
                  currentAudio: null};
  }

  render() {
    let selectedArtist = this.state.selectedArtist,
        searchContainer = <SearchContainer onSearchArtist={this.onSearchArtist.bind(this)}/>,
        searchQuery = this.state.searchQuery,
        artistWikipediaEntry = this.state.artistWikipediaEntry,
        artistSearchResults = this.state.artistSearchResults,
        albums = this.state.albums;

    let navBar = <NavigationBar />;
    let artistView = (<ArtistView onSelectArtist={this.onSelectArtist.bind(this)}
                                 artistSearchResults={artistSearchResults}
                                 selectedArtist={selectedArtist}
                                 artistWikipediaEntry={artistWikipediaEntry}/>);

    let albumView = (<AlbumView onPlayAudio={this.onPlayAudio.bind(this)}
                              onStopAudio={this.onStopAudio.bind(this)}
                              artistName={searchQuery}
                              onShowTrackList={this.onShowTrackList.bind(this)}
                              albums={albums}/>);

    return (<div>
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
    this.setState({searchQuery: text, albums: null, artistSearchResults: null, selectedArtist: null})
  }

  onSelectArtist(selectedArtist, e) {
    this.getArtistInfo(selectedArtist.name, this.saveArtistInfo.bind(this));
    this.searchAlbums(selectedArtist, this.saveAlbumResults.bind(this));
    this.setState({selectedArtist: selectedArtist})
  }

  // Pull tracks and populate into modal
  onShowTrackList(albumInfo, e) {
    this.setState({showTrackList: true});
  }

  saveAlbumResults(results) {
    this.setState({albums: results.items});
  }

  saveArtistResults(results) {
    this.setState({artistSearchResults: results.artists.items})
  }

  saveArtistInfo(results) {
    this.setState({artistWikipediaEntry: results})
  }

  // Have audio controller at top level so only one audio plays at a time
  onPlayAudio(audioUrl) {
    let audioPreview = new Audio(audioUrl);
    audioPreview.play()
    this.setState({currentAudio: audioPreview})
  }

  onStopAudio() {
    if(this.state.currentAudio) {
      this.state.currentAudio.pause()
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
};

// Our main instructions to render the application
ReactDOM.render(React.createElement(Application), document.getElementById('container'));