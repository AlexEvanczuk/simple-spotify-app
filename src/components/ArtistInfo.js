import React from 'react';

const ArtistInfo = ({ artistWikipediaEntry, selectedArtist }) => (
  <div>
    <h2>Artist Information</h2>
    <h2>{selectedArtist.name}</h2>
    <div dangerouslySetInnerHTML={{ __html: artistWikipediaEntry }} />
  </div>
);

ArtistInfo.propTypes = {
  selectedArtist: React.PropTypes.object,
  artistWikipediaEntry: React.PropTypes.string,
};

export default ArtistInfo;
