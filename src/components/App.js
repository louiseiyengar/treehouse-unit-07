import React from 'react';
//import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Gallery from './photos/Gallery';
import apiKey from '../config.js';

class App extends React.Component {
 
  state = {
    button1: [],
    button2: [],
    button3: [],
    search: []
  }

  handlePhotoResponse(searchName, imageData) {
    const photoArray = imageData.photos.photo.map((photo) => {
        return ({
            id: photo.id,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
          })
    });

    this.setState({
      [searchName]: photoArray
    })
  }

  initialSearch = () => {
    const queries = [encodeURIComponent('lion cubs'), encodeURIComponent('tiger cubs'), encodeURIComponent('bear cubs')]
    const apiRequests = [];

    for (let i = 0; i < queries.length; i++) {
      apiRequests[i] = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queries[i]}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json());
    }

    Promise.all([apiRequests[0], apiRequests[1], apiRequests[2]])
      .then(responseData => {
        this.handlePhotoResponse('button1', responseData[0]);
        this.handlePhotoResponse('button2', responseData[1]);
        this.handlePhotoResponse('button3', responseData[2]);
      })
      .catch((error) => {
        console.log("Error, error Will Robinson: ", error);
      });
  }

  searchFormSearch = (query) => {
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

  performSearch = (query = 'initial setup') => {
    if (query === 'initial setup') {
      this.initialSearch();
    } else {
      this.searchFormSearch(query);
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  render () {
    return (
        <div className="container">
          <Header />
          <Nav />
          <Gallery gallery={this.state.button1} />
        </div>
    );
  }
}

export default App;
