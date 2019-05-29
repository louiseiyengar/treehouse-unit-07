import React from 'react';
//import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Gallery from './photos/Gallery';
import apiKey from '../config.js';

class App extends React.Component {
 
  state = {
    images: [],
    button2: [],
    button3: [],
    search: []
  }

  componentDidMount() {
    this.performSearch();
  }

  handlePhotoResponse(imageData) {
    const photoArray = imageData.photos.photo.map((photo) => {
        return ({
            id: photo.id,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
          })
    });

    this.setState({
      images: photoArray
    })
  }

  performSearch = (query = 'lion cubs') => {
    query = encodeURIComponent(query);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.handlePhotoResponse(responseData);
    })
    .catch((error) => {
      console.log("Error, error Will Robinson: ", error);
    });
  }

  render () {
    return (
        <div className="container">
          <Header />
          <Nav />
          <Gallery gallery={this.state.images} />
        </div>
    );
  }
}

export default App;
