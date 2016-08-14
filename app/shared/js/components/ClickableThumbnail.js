import React from 'react';

export default class ClickableThumbnail extends React.Component {

  render () {
    let { onClick, overlayText, imageSrc } = this.props;

    return (<div onClick={onClick} className="clickable-thumbnail">
                <img src={imageSrc} height="200" width="200"/>
                <div className="clickable-thumbnail-overlay">
                  <span className="clickable-thumbnail-overlay-text">{overlayText}</span>
                </div>
              </div>);
  }
}
