import {useState} from "react";
import Popup from "./popup";
import PropTypes from "prop-types";

function Contenido({ images , lastImageElementRef}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          ref={index === images.length - 1 ? lastImageElementRef : null}
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
  );
}
Contenido.propTypes = {
    images: PropTypes.array.isRequired,
    lastImageElementRef: PropTypes.func.isRequired, // Cambia esto
};

export default Contenido;
