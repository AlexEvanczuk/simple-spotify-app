import React from 'react';
import TrackList from './TrackList';
import ClickableThumbnail from './ClickableThumbnail';

export default class AlbumView extends React.Component {
  render() {
    let { albums, onPlayAudio, onStopAudio } = this.props;
    let resultsHeader = (<h2>Albums</h2>);
    let resultsPage= null;

    if (albums) {
      resultsPage = (<span>
        {albums.map((album) => {
          return (<Album
                    onPlayAudio={onPlayAudio}
                    onStopAudio={onStopAudio}
                    albumInfo={album}
                    key={album.id} />);
        })}
      </span>);
    } else {
      resultsPage = <div>Select an artist</div>;
    }
    return (<span>{resultsHeader}{resultsPage}</span>);
  }

}

class Album extends React.Component {

  constructor() {
    super();
    this.state = { showTrackList:false };
  }

  render () {
    let { albumInfo, onPlayAudio, onStopAudio } = this.props;
    let albumCover = this.getMediumSizeAlbumCover(albumInfo);
    let albumName = albumInfo.name;
    let trackList = null;
    if(this.state.showTrackList) {
      trackList = (<TrackList
                    onCloseTrackList={this.closeTrackList.bind(this)}
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

  // Returns the medium sized album cover (second in the array of album covers)
  getMediumSizeAlbumCover(albumInfo) {
    return albumInfo.images[1].url;
  }
}