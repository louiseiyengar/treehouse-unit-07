import React from 'react';

const LoadingPhotos = props => {
  return (
    <div className="loading-photos">
      <h3>Please be Patient</h3>
      <p>Photos are loading...</p>
      <div className="loader"></div>
  </div>
  );
}

export default LoadingPhotos;