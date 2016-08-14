import React from 'react';
import ClickableThumbnail from './ClickableThumbnail';

export default class ArtistView extends React.Component {

  render() {
    let { onSelectArtist, selectedArtist, artistSearchResults, artistWikipediaEntry } = this.props;
    let resultsHeader = (<h2>Artist</h2>);

    let resultsPage = null;
    // If the user has selected an artist, display the artist picture on the left,
    // with the associated wikipedia article on the right
    if(selectedArtist) {
      resultsPage = <ArtistInfo artistWikipediaEntry={artistWikipediaEntry} artistInfo={selectedArtist}/>;
    // Otherwise, show the album results from the selected artist
    } else if(artistSearchResults) {
      resultsPage = (<div>
        {artistSearchResults.map(function(artist) {
          return <ArtistThumbnail onSelectArtist={onSelectArtist} artistInfo={artist} key={artist.id} />;
        })}
      </div>);
    } else {
      resultsPage = <div>Search an artist</div>;
    }

    return (<div>{resultsHeader}{resultsPage}</div>);
  }

}

class ArtistInfo extends React.Component {
  render() {
    let { artistInfo, artistWikipediaEntry } = this.props;

    return (<div>
      <div className="selected-artist"><ArtistThumbnail artistInfo={artistInfo} /></div>
      <div className="selected-artist">
        <h2>{artistInfo.name}</h2>
        <div dangerouslySetInnerHTML={{__html: artistWikipediaEntry}} />
      </div>
    </div>);
  }
}

class ArtistThumbnail extends React.Component {
  render() {
    let { artistInfo, onSelectArtist} = this.props;
    let artistPicture = null;
    if (artistInfo.images.length > 2) {
      artistPicture = artistInfo.images[0].url;
    } else {
      artistPicture = "https://image.freepik.com/free-icon/black-simple-music-note-vector_318-10095.jpg";
    }

    return (<ClickableThumbnail
              imageSrc={artistPicture}
              overlayText={artistInfo.name}
              onClick={this.handleSelect.bind(this, onSelectArtist, artistInfo)}/>);

  }

  handleSelect(onSelectArtist, artistInfo) {
    if (onSelectArtist) {
      onSelectArtist(artistInfo);
    }
  }


}
