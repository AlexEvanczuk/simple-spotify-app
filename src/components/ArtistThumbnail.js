import React from 'react';
import ClickableThumbnail from './ClickableThumbnail';

export default class ArtistThumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = (props.onSelectArtist
      ? this.handleSelect.bind(this, props.onSelectArtist, props.artistInfo)
      : null);
  }

  handleSelect(onSelectArtist, artistInfo) {
    onSelectArtist(artistInfo);
  }

  render() {
    const { artistInfo } = this.props;
    let artistPicture = null;
    if (artistInfo.images.length > 2) {
      artistPicture = artistInfo.images[0].url;
    } else {
      artistPicture = 'https://image.freepik.com/free-icon/black-simple-music-note-vector_318-10095.jpg';
    }

    return (<ClickableThumbnail
      imageSrc={artistPicture}
      overlayText={artistInfo.name}
      onClick={this.handleSelect}
    />);
  }
}
ArtistThumbnail.propTypes = {
  artistInfo: React.PropTypes.object.isRequired,
  onSelectArtist: React.PropTypes.func,
};
