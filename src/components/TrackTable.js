import React from 'react';
import Track from './Track';

export default class TrackTable extends React.Component {

  render() {
    const { trackList, currentlyPlayingTrack, onPlayAudio, onStopAudio } = this.props;
    const toggleAudio = this.toggleAudio;

    if (trackList) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Length</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {trackList.map((trackInfo) => (
              <Track
                currentlyPlayingTrack={currentlyPlayingTrack}
                toggleAudio={toggleAudio}
                trackInfo={trackInfo}
                key={trackInfo.id}
                onPlayAudio={onPlayAudio}
                onStopAudio={onStopAudio}
              />
            ))
            }
          </tbody>
        </table>);
    }

    return <span>Getting tracks...</span>;
  }
}

TrackTable.propTypes = {
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object,
  trackList: React.PropTypes.array
};
