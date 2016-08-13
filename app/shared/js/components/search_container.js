import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap/lib';

export default class SearchContainer extends React.Component {
  render() {
    let { onSearchArtist } = this.props;
    let searchHeader = (<h2>Search Artist</h2>);
    let searchBar = (
      <FormGroup>
        <InputGroup>
          <FormControl onChange={this.handleChange.bind(this, onSearchArtist)} type="text" />
          <InputGroup.Addon>
            <Glyphicon glyph="music" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    );

    return (<span>{searchHeader}{searchBar}</span>);
  }

  handleChange(onSearchArtist, e) {
    onSearchArtist(e.target.value)
  }
}