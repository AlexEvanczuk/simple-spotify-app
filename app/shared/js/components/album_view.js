import TrackList from './track_list';

export default class AlbumView extends React.Component {

	render() {
    let { artist, albums, onShowTrackList, onPlayAudio, onStopAudio } = this.props;
    let resultsHeader = (<h2>Albums</h2>);

    let resultsPage = null;

    if(albums) {
      resultsPage = (<span>
        {albums.map(function(album) {
          return <Album onPlayAudio={onPlayAudio} onStopAudio={onStopAudio} onShowTrackList={onShowTrackList} albumInfo={album} key={album.id} />;
        })}
      </span>);
    } else {
      resultsPage = <div>Select an artist</div>
    }
    let element = (<span>{resultsHeader}{resultsPage}</span>);
    return element
	}

};

class Album extends React.Component {

  constructor() {
    super();
    this.state = {showTrackList:false};
  }

  render () {
    let { albumInfo, onShowTrackList, onPlayAudio, onStopAudio } = this.props;
    let albumCover = albumInfo.images[1].url;
    let albumName = albumInfo.name;
    let trackList = null;
    if(this.state.showTrackList) {
      trackList = <TrackList onCloseTrackList={this.closeTrackList.bind(this)} onPlayAudio={onPlayAudio} onStopAudio={onStopAudio} albumInfo={albumInfo} />
    }
    return (<div onClick={this.openTrackList.bind(this)} className="album-thumbnail">
                <img src={albumCover} height="200" width="200"/>
                <div className="album-thumbnail-overlay">
                    {trackList}
                    <span className="album-thumbnail-overlay-text">{albumName}</span>
                </div>
              </div>);
  }

  openTrackList(){
    this.setState({showTrackList: true})
  }

  closeTrackList(){
    this.setState({showTrackList: false})
  }
}
