import React from 'react';
import TrackListModal from './TrackListModal';
import ClickableThumbnail from './ClickableThumbnail';
import * as SpotifyClient from '../api/spotifyClient';

const AlbumView = ({ albums, onPlayAudio, onStopAudio, currentlyPlayingTrack }) => (
  <span>
    <h2>Albums</h2>
    {albums ?
      <span>
        {albums.map((album) =>
          <Album
            onPlayAudio={onPlayAudio}
            onStopAudio={onStopAudio}
            currentlyPlayingTrack={currentlyPlayingTrack}
            albumInfo={album}
            key={album.id}
          />
        )}
      </span>
    : <div>Select an artist</div>}
  </span>
);
AlbumView.propTypes = {
  albums: React.PropTypes.array,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object,
};

export default AlbumView;

// Returns the medium sized album cover (second in the array of album covers)
const getMediumSizeAlbumCover = ((albumInfo) => (albumInfo.images[1].url));


class Album extends React.Component {

  constructor() {
    super();
    this.onCloseTrackList = this.closeTrackList.bind(this);
    this.onOpenTrackList = this.openTrackList.bind(this);
    this.state = { showTrackList: false,
      trackList: null };
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  openTrackList() {
    this.setState({ showTrackList: true });
  }

  closeTrackList() {
    this.setState({ showTrackList: false });
  }

  render() {
    let { albumInfo, onPlayAudio, onStopAudio, currentlyPlayingTrack } = this.props;
    let albumCover = getMediumSizeAlbumCover(albumInfo);
    let albumName = albumInfo.name;
    let trackListModal = null;

    if (this.state.showTrackList) {
      SpotifyClient.getAlbumTracks(albumInfo, (trackList) => {
        // Since this sets state in an AJAX call, we need to make sure the component
        // is still mounted to the DOM when we try to set state.
        if (!this.isUnmounted) this.setState({ trackList });
      });

      trackListModal = (<TrackListModal
        onCloseTrackList={this.onCloseTrackList}
        trackList={this.state.trackList}
        onPlayAudio={onPlayAudio}
        onStopAudio={onStopAudio}
        currentlyPlayingTrack={currentlyPlayingTrack}
        albumInfo={albumInfo}
      />);
    }

    let thumbnail = (<ClickableThumbnail
      imageSrc={albumCover}
      overlayText={albumName}
      onClick={this.onOpenTrackList}
    />);

    return (<span>{trackListModal}{thumbnail}</span>);
  }

}

Album.propTypes = {
  albumInfo: React.PropTypes.object.isRequired,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object,
};
