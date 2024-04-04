import { useState } from "react";
import Sing_up from "./Sing_Up";
import {
  getAuth,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const auth = getAuth();

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.log("Inicio sesión con Facebook"); // Muestra el mensaje en la consola
        onClose(); // Cierra el popup
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        setErrorMessage(errorMessage); // Muestra el mensaje de error
      });
    };


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Inicio sesión"); // Muestra el mensaje en la consola
      onClose(); // Cierra el popup
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Por favor, rellene los campos.");
      return;
    }

    // Iniciar sesión con Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Inicio sesión"); // Muestra el mensaje en la consola
        onClose(); // Cierra el popup
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage); // Muestra el mensaje de error
      });
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    setShowSignUp(true);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-center">Iniciar Sesion</h1>
            <p className="text-center">Te damos la bienvenida.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mx-auto block" onClick={handleFacebookLogin}>
              Inicia sesion con Facebook
            </button>
            <p className="text-center mt-5">o</p>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between mt-5">
              <p>Contraseña</p>
              <a
                href=""
                onClick={handleLinkClick}
                className="text-blue-500 hover:text-blue-800"
              >
                ¿Has Olvidado la contraseña?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mt-5 rounded mx-auto block"
              onClick={handleSubmit}
            >
              Iniciar Sesion
            </button>
            <div className="text-center">
              No tienes cuenta?{" "}
              <a
                href=""
                onClick={handleLinkClick}
                className="text-blue-500 hover:text-blue-800"
              >
                Unete
              </a>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {showSignUp && <Sing_up onClose={() => setShowSignUp(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
