import { Modal } from 'react-bootstrap/lib';

export default class AboutModal extends React.Component {
  constructor() {
    super();
    this.state = {showModal: true};
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  render() {

    return (
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Zen Spotify</Modal.Title>
          </Modal.Header>
          <Modal.Body className="track-listing-modal-body">
            <div>
              <h2>About</h2>
              This is a simple app to demonstrate the use of the Spotify Web API.
              <br/>
              Created by Alex Evanczuk.

              <h2>Features</h2>
              <ul>
                <li>Artist Search: Begin typing into the search bar to find matching artists</li>
                <li>Album Search: Select an artist to see their albums.</li>
                <li>Track Preview: Select an album to get its track listings and he ability to preview tracks.</li>
              </ul>

              <h2>Technology/Frameworks Used</h2>
              <ul>
                <li>React.js: For the main application architecture</li>
                <li>React-Bootstrap: For components and UI design</li>
                <li>Webpack: For bundling necessary JS</li>
                <li>Wikipedia API: For getting artist biographical information</li>
                <li>Spotify API: For getting artist musical information</li>
              </ul>

              <h2>Future Developments</h2>
              <ul>
                <li>Host on AWS or Heroku, allow logging in to show playlists and play full tracks</li>
                <li>Clean up CSS</li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
    );
  }
}