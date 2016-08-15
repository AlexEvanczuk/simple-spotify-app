import React from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap/lib';

const handleChange = ((onSearchArtist, e) => (onSearchArtist(e.target.value)));

export default class SearchContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = handleChange.bind(this, props.onSearchArtist);
  }

  render() {
    let searchHeader = (<h2>Search Artist</h2>);
    let searchBar = (
      <FormGroup>
        <InputGroup>
          <FormControl onChange={this.handleChange} type="text" />
          <InputGroup.Addon>
            <Glyphicon glyph="music" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    );

    return (<span>{searchHeader}{searchBar}</span>);
  }

}

SearchContainer.propTypes = {
  onSearchArtist: React.PropTypes.func.isRequired,
};
