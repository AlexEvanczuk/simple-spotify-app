import React from 'react';
import { Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap/lib';

const pad = (n) => ((n < 10) ? `0${n}` : n);

const convertMilliSeconds = (milliseconds) => {
  const seconds = milliseconds / 1000;
  const numMinutes = Math.floor(seconds / 60);
  const numSeconds = Math.floor(seconds % 60);
  return `${numMinutes}:${pad(numSeconds)}`;
};

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false };
    this.toggleAudio = this.toggleAudio.bind(this, props.onPlayAudio, props.onStopAudio);
  }

  toggleAudio(onPlayAudio, onStopAudio, currentlyPlayingTrack, track) {
    // Stop any existing music
    onStopAudio();
    // Start new music or switch from existing music
    if (!currentlyPlayingTrack || currentlyPlayingTrack.id !== track.id) {
      onPlayAudio(track);
    }
  }

  renderPlayButton(currentlyPlayingTrack, trackInfo) {
    let tooltip = (
      <Tooltip id="modal-tooltip">
        Play a preview of this track
      </Tooltip>
    );

    let playingClass = ((currentlyPlayingTrack && trackInfo.id === currentlyPlayingTrack.id) ?
        'audio-playing' :
        '');

    return (<OverlayTrigger placement="right" overlay={tooltip}>
      <Glyphicon
        className={playingClass}
        onClick={() => this.toggleAudio(currentlyPlayingTrack, trackInfo)}
        glyph="play-circle"
      />
    </OverlayTrigger>);
  }

  render() {
    const { trackInfo, currentlyPlayingTrack } = this.props;
    let explicitTag = null;
    if (trackInfo.explicit) {
      explicitTag = <span className="explicit">EXPLICIT</span>;
    }
    return (<tr>
      <th scope="row">{trackInfo.track_number}</th>
      <td>{trackInfo.name}{explicitTag}</td>
      <td>{convertMilliSeconds(trackInfo.duration_ms)}</td>
      <td>{this.renderPlayButton(currentlyPlayingTrack, trackInfo)}</td>
    </tr>);
  }
}

Track.propTypes = {
  trackInfo: React.PropTypes.object.isRequired,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object
};
