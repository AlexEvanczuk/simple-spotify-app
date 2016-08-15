import React from 'react';
import ArtistThumbnail from './ArtistThumbnail';
import TrackTable from './TrackTable';

// Artist view has three possible states
// 1. The user has selected an artist, in which case display the artist and their top tracks
// 2. The user is searching an artist, in which case display the matching results
// 3. The user has not searched for an artist, in which case prompt them to search
const ArtistView = ({ onSelectArtist,
  selectedArtist = null,
  artistSearchResults = null,
  selectedArtistTopTracks,
  currentlyPlayingTrack,
  onPlayAudio,
  onStopAudio
}) => (
  <div>
    {selectedArtist ?
      <ArtistTopTracks
        artistInfo={selectedArtist}
        selectedArtistTopTracks={selectedArtistTopTracks}
        onPlayAudio={onPlayAudio}
        currentlyPlayingTrack={currentlyPlayingTrack}
        onStopAudio={onStopAudio}
      />
    : artistSearchResults ?
      <div>
        <h2>Artist</h2>
        {artistSearchResults.map((artist) => (
          <ArtistThumbnail
            onSelectArtist={onSelectArtist}
            artistInfo={artist}
            key={artist.id}
          />
        ))}
      </div>
      : <div>
        <h2>Artist</h2>
        Search an artist
      </div>
    }
  </div>
);

ArtistView.propTypes = {
  onSelectArtist: React.PropTypes.func.isRequired,
  selectedArtist: React.PropTypes.object,
  artistSearchResults: React.PropTypes.array,
  selectedArtistTopTracks: React.PropTypes.array,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object,
};

export default ArtistView;

const ArtistTopTracks = ({ artistInfo,
  selectedArtistTopTracks,
  onPlayAudio,
  onStopAudio,
  currentlyPlayingTrack
}) => (
  <div>
    <h2>{artistInfo.name}</h2>
    <div className="artist-container">
      <div className="selected-artist">
        <ArtistThumbnail artistInfo={artistInfo} />
      </div>
      <div className="top-tracks-table">
        <h3>Top Tracks</h3>
        {<TrackTable
          trackList={selectedArtistTopTracks}
          onPlayAudio={onPlayAudio}
          onStopAudio={onStopAudio}
          currentlyPlayingTrack={currentlyPlayingTrack}
        />}
      </div>
    </div>
  </div>
);

ArtistTopTracks.propTypes = {
  artistInfo: React.PropTypes.object,
  selectedArtistTopTracks: React.PropTypes.array,
  onPlayAudio: React.PropTypes.func.isRequired,
  onStopAudio: React.PropTypes.func.isRequired,
  currentlyPlayingTrack: React.PropTypes.object,
};
