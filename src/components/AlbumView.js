import React from 'react';
import TrackList from './TrackList';
import ClickableThumbnail from './ClickableThumbnail';


const AlbumView = ({ albums, onPlayAudio, onStopAudio }) => (
  <span>
    <h2>Albums</h2>
    {albums ?
      <span>
        {albums.map((album) =>
          <Album
            onPlayAudio={onPlayAudio}
            onStopAudio={onStopAudio}
            albumInfo={album}
            key={album.id}
          />
        )}
      </span>
    : <div>Select an artist</div>}
  </span>
);
AlbumView.propTypes = {
  albums: React.PropTypes.array.isRequired,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
};

export default AlbumView;

class Album extends React.Component {

  constructor() {
    super();
    this.state = { showTrackList: false };
  }

  render() {
    let { albumInfo, onPlayAudio, onStopAudio } = this.props;
    let albumCover = getMediumSizeAlbumCover(albumInfo);
    let albumName = albumInfo.name;
    let trackList = null;
    let onCloseTrackList = this.closeTrackList.bind(this);
    if (this.state.showTrackList) {
      trackList = (<TrackList
                    onCloseTrackList={onCloseTrackList}
                    onPlayAudio={onPlayAudio}
                    onStopAudio={onStopAudio}
                    albumInfo={albumInfo} />);
    }

    let thumbnail = (<ClickableThumbnail
                      imageSrc={albumCover}
                      overlayText={albumName}
                      onClick={this.openTrackList.bind(this)}/>);

    return (<span>{trackList}{thumbnail}</span>);
  }

  openTrackList() {
    this.setState({showTrackList: true});
  }

  closeTrackList() {
    this.setState({ showTrackList: false });
  }

}

// Returns the medium sized album cover (second in the array of album covers)
const getMediumSizeAlbumCover = ((albumInfo) => (albumInfo.images[1].url));

Album.propTypes = {
  albumInfo: React.PropTypes.object.isRequired,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
};
