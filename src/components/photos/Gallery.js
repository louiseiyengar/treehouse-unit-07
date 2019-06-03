import React from 'react';
import GalleryItem from './GalleryItem';
import LoadingPhotos from './LoadingPhotos';
import NoPhotos from './NoPhotos';

const Gallery = props => {
  const galleryList = props.gallery;
  let photos;

  if (props.loading) {  
    photos = <LoadingPhotos />
  } else if (galleryList.length > 0) {
    photos = galleryList.map((photo) =><GalleryItem key={photo.id} url={photo.url} />);
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
