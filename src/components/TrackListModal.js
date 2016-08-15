import React from 'react';
import { Modal } from 'react-bootstrap/lib';
import TrackTable from './TrackTable';

export default class TrackListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
    this.close = this.close.bind(this, props.onStopAudio, props.onCloseTrackList);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  close(onStopAudio, onCloseTrackList) {
    this.setState({ showModal: false });
    onCloseTrackList();
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { albumInfo, onPlayAudio, currentlyPlayingTrack, onStopAudio, trackList } = this.props;

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Tracks on album: {albumInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="track-listing-modal-body">
          {<TrackTable
            albumInfo={albumInfo}
            trackList={trackList}
            onPlayAudio={onPlayAudio}
            onStopAudio={onStopAudio}
            currentlyPlayingTrack={currentlyPlayingTrack}
          />}
        </Modal.Body>
      </Modal>
    );
  }
}

TrackListModal.propTypes = {
  albumInfo: React.PropTypes.object.isRequired,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  onCloseTrackList: React.PropTypes.func.isRequired,
  trackList: React.PropTypes.array,
  currentlyPlayingTrack: React.PropTypes.object
};
