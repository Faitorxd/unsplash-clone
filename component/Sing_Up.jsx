import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function Register({onClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!email || !password) {
            setErrorMessage('Por favor, rellene los campos.');
            return;
        }
    
        const auth = getAuth();
    
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // El usuario se registró correctamente
                console.log('Sing up');
                onClose(); // Cierra el popup
            })
            .catch((error) => {
                // Ocurrió un error al registrar al usuario
                setErrorMessage(error.message);
            });
    };

    const handleLinkClick = (event) => {
        event.preventDefault();
        // Aquí va tu código para manejar el clic en el enlace
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={(event) => event.stopPropagation()}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h1 className="text-center">Registrar</h1>
                        <p className="text-center">Te damos la bienvenida.</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mx-auto block">
                            Regístrate con Facebook
                        </button>
                        <p className="text-center mt-5">o</p>
                        <div>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex justify-between mt-5">
                            <p>Contraseña</p>
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mt-5 rounded mx-auto block" onClick={handleSubmit}>
                            Registrar
                        </button>
                        <div className="text-center">
                            ¿Ya tienes cuenta? <a href="" onClick={handleLinkClick} className="text-blue-500 hover:text-blue-800">Inicia sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}