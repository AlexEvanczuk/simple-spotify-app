import { Button, Thumbnail } from 'react-bootstrap/lib';

export default class ArtistView extends React.Component {

  render() {
    let { onSelectArtist, selectedArtist, artistSearchResults, artistWikipediaEntry } = this.props;
    let resultsHeader = (<h2>Artist</h2>);

    let resultsPage = null;
    // If the user has selected an artist, display the artist picture on the left,
    // with the associated wikipedia article on the right
    if(selectedArtist) {
      resultsPage = <SelectedArtist artistWikipediaEntry={artistWikipediaEntry} artistInfo={selectedArtist}/>;
    } else if(artistSearchResults) {
      resultsPage = (<div>
        {artistSearchResults.map(function(artist) {
          return <FoundArtist onSelectArtist={onSelectArtist} artistInfo={artist} key={artist.id} />;
        })}
      </div>);
    } else {
      resultsPage = <div>Search an artist</div>
    }
    let element = (<div>{resultsHeader}{resultsPage}</div>);
    return element
  }

};

class SelectedArtist extends React.Component {
  render () {
    let { artistInfo, artistWikipediaEntry } = this.props;
    let artistPicture = null;
    if(artistInfo.images.length > 2) {
      artistPicture = artistInfo.images[0].url;
    } else {
      artistPicture = "https://image.freepik.com/free-icon/black-simple-music-note-vector_318-10095.jpg"
    }

    let resultsPage = (<div>
      <div className="found-artist"><Thumbnail src={artistPicture} alt="202x225"/></div>
      <div className="found-artist">
        <h2>{artistInfo.name}</h2>
        <div dangerouslySetInnerHTML={{__html: artistWikipediaEntry}}></div>
      </div>
    </div>);

    return resultsPage

  }

}

class FoundArtist extends React.Component {
  render () {
    let { artistInfo, onSelectArtist} = this.props;
    let artistPicture = null;
    if(artistInfo.images.length > 2) {
      artistPicture = artistInfo.images[0].url;
    } else {
      artistPicture = "https://image.freepik.com/free-icon/black-simple-music-note-vector_318-10095.jpg"
    }
    let artistName = artistInfo.name;
    let selectArtistButton = <Button onClick={this.handleSelect.bind(this, onSelectArtist, artistInfo)}
                                   bsStyle="primary"
                                    className="select-artist-button">{artistName}</Button>

    return (<Thumbnail src={artistPicture} alt="202x225">
              {selectArtistButton}
            </Thumbnail>)
  }

  handleSelect(onSelectArtist, artistInfo, e) {
    onSelectArtist(artistInfo)
  }

}