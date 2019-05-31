import React from 'react';
import {Route, Redirect} from 'react-router-dom';
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

  initialSearchTerms = ["Sunsets", "Perfume Bottles", "Lion Cubs"];

  handlePhotoResponse(searchName, imageData, query = '') {
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
    console.log("are you here");
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
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${encodeURIComponent(query)}&per_page=24&format=json&nojsoncallback=1`)
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
      if (this.state.button1.length < 1) {
        this.initialSearch();
      }
    }
  }

  componentDidMount() {
    const thisPath = this.props.location.pathname;
    const query = (thisPath.indexOf('/search/') > -1) ? thisPath.replace('/search/', '') : 'initial setup';
    this.performSearch(query);
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;
    const thisPath = this.props.location.pathname;
    if (thisPath.indexOf('/search/') > -1) {
      if (thisPath !== prevPath) {
        const query = thisPath.replace('/search/', '')
        this.performSearch(query);
      }
    }
  }

  render () {
    return (
      <div className="container">
          <Route
            render={ (props) => <Header {...props} 
                      buttonText={this.initialSearchTerms} 
                      search={this.performSearch} 
          />} />
          <Route
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
    );
  }
}

export default App;
