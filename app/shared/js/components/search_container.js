import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap/lib';

export default class SearchContainer extends React.Component {
  render() {
    let { onSearchArtist } = this.props;
  var searchHeader = (<h2>Search Artist</h2>);
  var searchBar = (
    <FormGroup>
      <InputGroup>
        <FormControl onChange={this.handleChange.bind(this, onSearchArtist)} type="text" />
        <InputGroup.Addon>
          <Glyphicon glyph="music" />
        </InputGroup.Addon>
      </InputGroup>
    </FormGroup>
  );

  var element = (<span>{searchHeader}{searchBar}</span>);

  return element;
  }

  handleChange(onSearchArtist, e) {
    onSearchArtist(e.target.value)
  }
}