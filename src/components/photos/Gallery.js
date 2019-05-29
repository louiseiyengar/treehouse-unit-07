import React from 'react';
import GalleryItem from './GalleryItem';
import NoPhotos from './NoPhotos';

const Gallery = props => { 
  const galleryList = props.gallery;
  let photos;

  if (galleryList.length > 0) {
    photos = galleryList.map((photo, index) =><GalleryItem key={index + 1} url={photo.url} id={index + 1} />);
  } else {
    photos = <NoPhotos />
  }

  return(
    <div className="photo-container">
      <ul>
        {photos}
      </ul> 
    </div>
  );
}

export default Gallery;
