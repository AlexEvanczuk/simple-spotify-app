import $ from 'jquery';

// Search for all artists that match a query string
function searchArtists(artistName, successCallback) {
  if (artistName.length === 0) {
    successCallback(null);
  } else {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: { q: artistName, type: 'artist' },
      success: (data) => (successCallback(data.artists.items))
    });
  }
}

// Pull the albums from a given artist object
function searchAlbums(artist, successCallback) {
  $.ajax({
    url: `https://api.spotify.com/v1/artists/${artist.id}/albums`,
    success: (data) => (successCallback(data.items))
  });
}

// Get tracks on a given album
function getAlbumTracks(albumInfo, saveTrackListResults) {
  $.ajax({
    url: `https://api.spotify.com/v1/albums/${albumInfo.id}/tracks`,
    data: { limit: 50 },
    success: (data) => (saveTrackListResults(data.items))
  });
}

// Takes in a track list and transforms it to be a list of top 5 tracks
function transformTopTrackList(trackList) {
  const modifiedTrackList = trackList.map((track, i) => {
    const modifiedTrack = track;
    modifiedTrack.track_number = i + 1;
    return modifiedTrack;
  });
  return modifiedTrackList.slice(0, 5);
}

// Get top 5 tracks for a given artist, modify
function getTopTracks(artistInfo, saveTopTracks) {
  $.ajax({
    url: `https://api.spotify.com/v1/artists/${artistInfo.id}/top-tracks`,
    data: { country: 'US' },
    success: (data) => (saveTopTracks(transformTopTrackList(data.tracks)))
  });
}

module.exports = {
  searchArtists,
  searchAlbums,
  getAlbumTracks,
  getTopTracks
};
