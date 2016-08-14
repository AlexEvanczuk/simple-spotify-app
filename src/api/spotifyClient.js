import $ from "jquery";

// Search for all artists that match a query string
function searchArtists(artistName, successCallback) {
  if (artistName.length === 0) {
    return [];
  }

  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: { q: artistName, type: 'artist' },
    success: function(data) { successCallback(data['artists']['items']); }
  });
}

// Pull the albums from a given artist object
function searchAlbums(artist, successCallback) {
  $.ajax({
    url: 'https://api.spotify.com/v1/artists/' + artist.id + "/albums",
    success: function(data) { successCallback(data['items']) }
  });
}

module.exports = {
  searchArtists: searchArtists,
  searchAlbums: searchAlbums,
};
