import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
function Popup({ isOpen, onClose, children }) {
  console.log("Popup -> isOpen", isOpen);
  if (!isOpen) {
    return null;
  }

  const innerRef = useRef();

  const handleClickOutside = useCallback(
    (event) => {
      if (innerRef.current && !innerRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div
        ref={innerRef}
        className="bg-white p-4 rounded shadow-lg"
        style={{ width: "1232px", height: "662px" }}
      >
        {children}
      </div>
    </div>
  );
}
Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Popup;
