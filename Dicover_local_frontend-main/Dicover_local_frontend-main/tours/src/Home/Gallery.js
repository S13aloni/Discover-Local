
import React, { useState } from 'react';
import './Gallery.css'; // Link to the CSS file

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
//   https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsJTIwbW91bnRhaW58ZW58MHwwfDB8fHww
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1712388430474-ace0c16051e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuYWxpfGVufDB8MHwwfHx8MA%3D%3D', alt: 'Image 1' },
    { id: 2, src: 'https://www.keralasoils.gov.in/sites/default/files/inline-images/kerala1.jpg', alt: 'Image 2' },
    { id: 3, src: 'https://volzero.com/img/news/88041_banner.jpg', alt: 'Image 3' },
    { id: 4, src: 'https://www.omaxe.com/blog/wp-content/uploads/2017/11/Magnificent-Monuments-of-Delhi.png', alt: 'Image 4' },
    { id: 5, src: '1.jpg', alt: 'Image 5' },
    { id: 6, src: 'https://plus.unsplash.com/premium_photo-1667401373119-f9af8c7ccf8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwd2F0ZXJmYWxsfGVufDB8MXwwfHx8MA%3D%3D', alt: 'Image 6' },
    { id: 7, src: 'https://media.istockphoto.com/id/530814972/photo/kedarnath-in-india.jpg?s=612x612&w=0&k=20&c=MXpZVgngXRFJgbdJbu2jVSeFDlpFtETo20Y8NxIvBuY=', alt: 'Image 7' },
    { id: 8, src: 'https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg', alt: 'Image 8' },
    { id: 9, src: 'https://images.unsplash.com/photo-1576478082793-e806ba5f87b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlc2h3YXRlciUyMGJlYWNofGVufDB8fDB8fHww', alt: 'Image 9' },
    { id: 10, src: 'https://images.unsplash.com/photo-1634455211118-2b06099fb328?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFpbml0YWx8ZW58MHwxfDB8fHww', alt: 'Image 9' },

    { id: 11, src: 'https://media1.thrillophilia.com/filestore/ve6q3r35ohqelz10ngs6ircrcmv1_shutterstock_461554210.jpg', alt: 'Image 9' },
    { id: 12, src: 'https://media.timeout.com/images/105241451/image.jpg', alt: 'Image 9' },
    { id: 13, src: 'https://www.thechardhamyatra.com/wp-content/uploads/2023/02/Devprayag-Uttrakhand.jpg', alt: 'Image 9' },
    { id: 14, src: 'https://www.gujarattourism.com/content/dam/gujrattourism/images/weekend-get-aways/great-rann-of-kutch/Great-Rann-Of-Kutch-Banner.jpg', alt: 'Image 9' },
    { id: 15, src: 'https://images.cnbctv18.com/wp-content/uploads/2022/09/Assam.jpg?impolicy=website&width=1200&height=900', alt: 'Image 9' },
  ];

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Amazing Image Gallery</h1>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item" onClick={() => openImage(image)}>
            <img src={image.src} alt={image.alt} className="gallery-img" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox">
          <button className="lightbox-close" onClick={closeImage}>✖</button>
          <img src={selectedImage.src} alt={selectedImage.alt} className="lightbox-img" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
