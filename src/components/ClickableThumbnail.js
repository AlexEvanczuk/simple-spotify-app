import React from 'react';

const ClickableThumbnail = ({ onClick = null, overlayText, imageSrc }) => (
  // TODO: Use classnames to specify cursor behavior
  <div onClick={onClick} className={onClick ? 'clickable-thumbnail' : 'non-clickable-thumbnail'}>
    <img alt="None found" src={imageSrc} height="200" width="200" />
    <div className="clickable-thumbnail-overlay">
      <span className="clickable-thumbnail-overlay-text">{overlayText}</span>
    </div>
  </div>
);

ClickableThumbnail.propTypes = {
  onClick: React.PropTypes.func,
  overlayText: React.PropTypes.string.isRequired,
  imageSrc: React.PropTypes.string.isRequired
};

export default ClickableThumbnail;
