import React from 'react';
import ReactDOM from 'react-dom';
import * as SpotifyClient from '../api/spotifyClient';
import * as WikipediaClient from '../api/wikipediaClient';
import SearchContainer from './SearchContainer';
import ArtistView from './ArtistView';
import AlbumView from './AlbumView';
import AboutModal from './AboutModal';
import NavigationBar from './NavigationBar';
import ArtistInfo from './ArtistInfo';

class Application extends React.Component {
  constructor() {
    super();
    this.state = { artistSearchResults: null,
                    selectedArtist: null,
                    selectedArtistTopTracks: null,
                    artistWikipediaEntry: null,
                    albumSearchResults: null,
                    currentlyPlayingTrack: null,
                    showAboutModal: null };

    this.onPlayAudio = this.onPlayAudio.bind(this);
    this.onOpenAbout = this.onOpenAbout.bind(this);
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.onSelectArtist = this.onSelectArtist.bind(this);
    this.onStopAudio = this.onStopAudio.bind(this);
    this.onCloseAbout = this.onCloseAbout.bind(this);
  }

  // Store search results and clear out any existing artist info
  onSearchArtist(text) {
    this.setState({ selectedArtistTopTracks: null,
      albumSearchResults: null,
      artistSearchResults: null,
      selectedArtist: null });

    SpotifyClient.searchArtists(text, (artistSearchResults) => {
      this.setState({ artistSearchResults });
    });
  }

  // When the user selects an artist, save the selected artist, and then
  // asynchronously load the artist info from wikipedia,
  // their top tracks, and their albums
  onSelectArtist(selectedArtist) {
    this.setState({ selectedArtist });

    const title = selectedArtist.name;
    WikipediaClient.getArticleWithTitle(title, (artistWikipediaEntry) => {
      this.setState({ artistWikipediaEntry });
    });
    SpotifyClient.searchAlbums(selectedArtist, (albumSearchResults) => {
      this.setState({ albumSearchResults });
    });
    SpotifyClient.getTopTracks(selectedArtist, (selectedArtistTopTracks) => {
      this.setState({ selectedArtistTopTracks });
    });
  }

  // Start a new audio stream
  onPlayAudio(track) {
    this.audio = new window.Audio(track.preview_url);
    this.audio.play().catch((err) => {
      // Audio play throws error if paused before it has started playing
      // http://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
      if (err.message == 'The play() request was interrupted by a call to pause().') return;
      console.error(err); // eslint-disable-line no-console
    });

    this.audio.addEventListener('ended', () => (this.onStopAudio()));

    this.setState({ currentlyPlayingTrack: track });
  }

  // Stop playing any audio
  onStopAudio() {
    if (this.audio) {
      this.setState({ currentlyPlayingTrack: null });
      this.audio.pause();
    }
  }

  // Open the about modal
  onOpenAbout() {
    this.setState({ showAboutModal: true });
  }

  // Close the about modal
  onCloseAbout() {
    this.setState({ showAboutModal: false });
  }

  render() {
    let { selectedArtist,
        artistWikipediaEntry,
        artistSearchResults,
        currentlyPlayingTrack,
        selectedArtistTopTracks,
        albumSearchResults } = this.state;

    let aboutModal = null;
    let artistInfo = null;

    let navBar = (<NavigationBar
      onOpenAbout={this.onOpenAbout}
    />);

    let searchContainer = (<SearchContainer
      onSearchArtist={this.onSearchArtist}
    />);

    let artistView = (<ArtistView
      onSelectArtist={this.onSelectArtist}
      currentlyPlayingTrack={currentlyPlayingTrack}
      artistSearchResults={artistSearchResults}
      selectedArtist={selectedArtist}
      selectedArtistTopTracks={selectedArtistTopTracks}
      onPlayAudio={this.onPlayAudio}
      onStopAudio={this.onStopAudio}
    />);

    let albumView = (<AlbumView
      currentlyPlayingTrack={currentlyPlayingTrack}
      onPlayAudio={this.onPlayAudio}
      onStopAudio={this.onStopAudio}
      albums={albumSearchResults}
    />);

    if (this.state.showAboutModal) {
      aboutModal = (<AboutModal
        onCloseAbout={this.onCloseAbout}
      />);
    }

    if (selectedArtist) {
      artistInfo = (<ArtistInfo
        selectedArtist={selectedArtist}
        artistWikipediaEntry={artistWikipediaEntry}
      />);
    }

    // Main application top level view
    return (<div>
      {aboutModal}
      <div>{navBar}</div>
      <div className="application-body">
        {searchContainer}
        {artistView}
        {albumView}
        {artistInfo}
      </div>
    </div>);
  }

}

// Our main instructions to render the application
ReactDOM.render(<Application />, document.getElementById('container'));
