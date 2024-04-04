import { Link } from "react-router-dom";
import Carrusel from "./Carrusel";
export default function NavFilter() {
    return (
        <div className="pr-5 pl-5 flex h-14 items-center text-center">
            <ul className="flex gap-5 text-gray-400 align-middle justify-center">
                <li><Link to="/editorial">Editorial</Link></li>
                <li><Link to="/unsplash">Unsplash+</Link></li>
            </ul>
            <div className="w-4 h-14 border-r border-gray-300"></div>
            <div className="w-4 h-14"></div>
            <Carrusel />
        </div>
    )
}