import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
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

  initialSearchTerms = ["Sunsets", "Flowers", "Lion Cubs"];

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
    //const queries = [encodeURIComponent(this.initialSearchTerms[0]), encodeURIComponent(this.initialSearchTerms[1]), encodeURIComponent(this.initialSearchTerms[2])]
    let queries = [];
    const apiRequests = [];

    queries = this.initialSearchTerms.map(term => encodeURIComponent(term));

    for (let i = 0; i < queries.length; i++) {
      apiRequests[i] = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queries[i]}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json());
    }

    Promise.all([apiRequests[0], apiRequests[1], apiRequests[2]])
      .then(responseData => {
        for (let i = 0; i < queries.length; i++) {
          this.handlePhotoResponse(('button' + (i + 1)), responseData[i]);
        }
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
        this.handlePhotoResponse('search', responseData);
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
    this.performSearch('initial setup');
    console.log(window.location.href);
  }

  render () {
    return (
      <BrowserRouter>
          <div className="container">
            <Route path="/" 
              render={ (props) => <Header {...props} search={this.performSearch} />} />
            <Route path="/" 
              render={ () => <Nav buttonText={this.initialSearchTerms} />} />
            <Route exact path='/' 
              render={ () => <Redirect to="/button1" />} />
            <Route path="/button1" 
               render={ () => <Gallery gallery={this.state.button1} /> } />
            <Route path="/button2" 
               render={ () => <Gallery gallery={this.state.button2} /> } />
            <Route path="/button3" 
               render={ () => <Gallery gallery={this.state.button3} /> } />
            <Route path="/search/:searchTerm"
               render={ () => <Gallery gallery={this.state.search} /> } />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
