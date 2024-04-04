import { Link } from "react-router-dom";
import "../src/index.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {uploadFile} from "../src/firebase";

export default function Navbar({ onLoginClick }) {
  const [showDiv, setShowDiv] = useState(false);
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sesión cerrada");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error al cerrar sesión", error);
      });
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Limpiar la suscripción al desmontar
    return () => unsubscribe();
  }, []);
  return (
    <nav className="flex items-center p-[11px]">
      <div>
        <Link to="/">
          <img
            className="h-8 w-11"
            src="https://1.bp.blogspot.com/-r4Yr35WCOUY/XdyOeCKvU1I/AAAAAAAALf0/5LUup8QpSE01lcisy6wT39YIZjeNc8o1ACLcBGAsYHQ/w1200-h630-p-k-no-nu/Unsplash.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="w-4 h-10"></div>
      <button className="rounded-l-full bg-gray-200 w-8 h-9 border-zinc-200">
        <img
          className="w-8 h-5 pl-3.5"
          src="https://e7.pngegg.com/pngimages/618/968/png-clipart-computer-icons-loupe-icon-download-zooming-user-interface.png"
          alt=""
        />
      </button>
      <input
        className="w-[705px] h-9 bg-gray-200 border-zinc-200 focus:ring-1 focus:ring-gray-300"
        type="text"
        placeholder="Buscar fotos"
      />
      <button className="rounded-r-full bg-gray-200  border-zinc-200 h-9">
        <img
          className="h-5 w-12 pl-3.5 pr-3.5"
          src="https://th.bing.com/th/id/R.0292dc3d4989e32d3cc62a3e8b6bb890?rik=qPyx4dhiZoRAzg&pid=ImgRaw&r=0"
          alt=""
        />
      </button>
      <div className="w-4 h-10"></div>
      <ul className="flex text-sm text-decoration-none gap-x-6 justify-center items-center">
        <li>
          <Link to="/explore">Explorar</Link>
        </li>
        <li>
          <Link to="/advertise">Anunciarse</Link>
        </li>
        <li>
          <Link to="/plus">Unsplash+</Link>
        </li>
      </ul>
      <div className="w-4 h-10 border-r border-gray-300"></div>
      <div className="w-5 h-10"></div>
      <div className="flex text-sm items-center justify-center gap-x-2 text-center">
        <Link
          onClick={(event) => {
            event.preventDefault();
            onLoginClick();
          }}
          className="w-[100px] pl-[8px] pr-[8px]"
          to="/Login"
        >
          Inicia sesión
        </Link>
        <input type="file" id="fileInput" style={{ display: "none" }} onChange={ e => uploadFile(e.target.files[0])} />
        <label
          htmlFor="fileInput"
          className="text-black rounded mx-auto block cursor-pointer"
        >
          Enviar una foto
        </label>
        {user && (
          <img
            className="h-8 w-8 rounded-full cursor-pointer"
            src={user.photoURL || "https://example.com/default-avatar.png"}
            alt="Avatar"
            onClick={() => setShowDiv(!showDiv)}
          />
        )}
        {showDiv && (
          <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
      <div className="w-4 h-10"></div>
      <button className="w-11 h-14 text-2xl text-slate-500">☰</button>
    </nav>
  );
}
