import $ from "jquery";
import React from 'react';
import { Modal, Tooltip, OverlayTrigger, Glyphicon} from 'react-bootstrap/lib';

export default class TrackList extends React.Component {
  constructor() {
    super();
    this.state = { showModal: true,
                    trackList: null,
                    currentlyPlayingTrack: null};
  }

  close(onStopAudio, onCloseTrackList) {
    this.setState({ currentlyPlayingTrack: null, showModal: false });
    onStopAudio();
    onCloseTrackList();
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    let { albumInfo, onPlayAudio, onStopAudio, onCloseTrackList } = this.props;

    return (
      <Modal show={this.state.showModal} onHide={this.close.bind(this, onStopAudio, onCloseTrackList)}>
        <Modal.Header closeButton>
          <Modal.Title>Tracks on album: {albumInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="track-listing-modal-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Length</th>
                <th></th>
              </tr>
            </thead>
            {this.renderTrackRows(albumInfo, this.state.currentlyPlayingTrack, this.toggleAudio.bind(this, onPlayAudio, onStopAudio))}
          </table>
        </Modal.Body>
      </Modal>
    );
  }

  toggleAudio(onPlayAudio, onStopAudio, track) {
    // Stop any existing music
    onStopAudio();
    this.setState({currentlyPlayingTrack: null});
    let currentlyPlayingTrack = this.state.currentlyPlayingTrack;
    // Start new music or switch from existing music
    if(!currentlyPlayingTrack || currentlyPlayingTrack.id != track.id) {
      this.setState({currentlyPlayingTrack: track});
      onPlayAudio(track['preview_url'])
    }
  }

  // Since this sets state in an AJAX call, we need to make sure the component
  // is still mounted to the DOM when we try to set state.
  saveTrackListResults(results) {
    if(!this.isUnmounted) {
      this.setState({trackList: results.items})
    }
  }

  getAlbumTracks(albumInfo, saveTrackListResults) {
   $.ajax({
      url: 'https://api.spotify.com/v1/albums/' + albumInfo.id + "/tracks",
        data: {limit: 50},
        success: saveTrackListResults
      });
  }

  renderTrackRows(albumInfo, currentlyPlayingTrack, toggleAudio) {
    this.getAlbumTracks(albumInfo, this.saveTrackListResults.bind(this));
    if(this.state.trackList) {
      return (<tbody>
        {this.state.trackList.map(function(trackInfo) {
          return <Track currentlyPlayingTrack={currentlyPlayingTrack} toggleAudio={toggleAudio} trackInfo={trackInfo} key={trackInfo.id} />;
        })}
      </tbody>);
    } else {
      return <tbody>Getting tracks...</tbody>;
    }

  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }
}

class Track extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {playing: false}
  }

  render() {
    let { trackInfo, toggleAudio, currentlyPlayingTrack } = this.props;
    let explicitTag = null;
    if(trackInfo['explicit']) {
      explicitTag = <span className="explicit">EXPLICIT</span>;
    }
    return (<tr> 
              <th scope="row">{trackInfo['track_number']}</th>
              <td>{trackInfo.name}{explicitTag}</td>
              <td>{this.convertMilliSeconds(trackInfo['duration_ms'])}</td>
              <td>{this.renderPlayGif(toggleAudio, trackInfo, currentlyPlayingTrack)}</td>
            </tr>);
  }

  convertMilliSeconds(milliseconds) {
    var seconds = milliseconds / 1000;
    var numminutes = Math.floor(seconds / 60);
    var numseconds = Math.floor(seconds % 60);
    return numminutes + ":" + pad(numseconds);
  }

  renderPlayGif(toggleAudio, trackInfo, currentlyPlayingTrack) {
    let tooltip = (
      <Tooltip id="modal-tooltip">
        Play a preview of this track
      </Tooltip>
    );

    let playingClass = (currentlyPlayingTrack && trackInfo.id == currentlyPlayingTrack.id) ? "audio-playing" : "";

    return (<OverlayTrigger placement="right" overlay={tooltip}>
              <Glyphicon className={playingClass} onClick={() => toggleAudio(trackInfo)} glyph="play-circle" />
            </OverlayTrigger>);
  }
}

const pad = (n) => ((n < 10) ? ("0" + n) : n);