import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../component/Navbar";
import NavFilter from "../component/NavFilter";
import Popup from "../component/popup";
import Login from "../component/Login";
import axios from "axios";
import './firebase';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const url = `https://api.unsplash.com/photos?page=${page}&per_page=10`;
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Client-ID gr-oRXlXmvjBjuJMp_h2HdlhniFGRrv-dUpX5K6b5xM`,
        },
      });
  
      const newImages = response.data;
      setImages((prevImages) => [...prevImages, ...newImages]);
    };
  
    fetchImages();
  }, [page]);

  useEffect(() => {
    var options = {
      root: null, // viewport
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }


    return () => observer.disconnect();
  }, [loader.current]); 

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) { 
      setPage((prevPage) => prevPage + 1); 
    }
  };
  return (
    <>
      <Router>
        <Navbar  onLoginClick={() => setIsLoginOpen(true)} />
        <NavFilter />
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-74 md:mr-74 ml-4 mr-4" style={{ marginLeft: '74px', marginRight: '74px' }}>
          {images.map((image, index) => (
            <div
              ref={index === images.length - 1 ? loader : null}
              key={image.id}
              className="relative group cursor-pointer"
              style={{ height: "300px" }}
              onClick={() => handleClick(image)}
            >
              <img
                src={image.urls.small}
                alt={image.alt_description}
                className="object-cover w-full h-full transition duration-500 ease-in-out transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={image.user.profile_image.small}
                      alt={image.user.name}
                      className="rounded-full w-10 h-10"
                    />
                    <a
                      href={image.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                    >
                      {image.user.name}
                    </a>
                  </div>
                  <button className="bg-white p-1 rounded text-red-500 w-10 h-8">
                    ❤️
                  </button>
                </div>
                <div className="flex justify-end">
                  <button className="bg-white p-1 rounded text-green-500 w-10 h-8 mr-2">
                    +
                  </button>
                  <a href={image.urls.full} download>
                    <button className="bg-white p-1 rounded text-blue-500 w-10 h-8">
                      ⬇️
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
          {isOpen && (
            <Popup isOpen={isOpen} onClose={handleClose}>
              <div className="flex flex-col items-center justify-center h-full">
                <header
                  className="pt-3 pb-3 pr-5 pl-5 flex justify-between items-center"
                  style={{ width: "1232px", height: "62px" }}
                >
                  <div className="flex items-center">
                    <img
                      src={selectedImage.user.profile_image.small}
                      alt={selectedImage.user.name}
                      className="rounded-full w-10 h-10"
                    />
                    <a
                      href={selectedImage.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      {selectedImage.user.name}
                    </a>
                  </div>
                  <div>
                    <button className="bg-white p-1 rounded text-red-500 w-10 h-8 mr-2">
                      ❤️
                    </button>
                    <button className="bg-white p-1 rounded text-green-500 w-10 h-8 mr-2">
                      +
                    </button>
                    <a href={selectedImage.urls.full} download>
                      <button className="bg-white p-1 rounded text-blue-500 w-10 h-8">
                        ⬇️
                      </button>
                    </a>
                  </div>
                </header>
                <img
                  src={selectedImage.urls.full}
                  alt={selectedImage.alt_description}
                  style={{ width: "895px", height: "580px" }}
                />
              </div>
            </Popup>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
