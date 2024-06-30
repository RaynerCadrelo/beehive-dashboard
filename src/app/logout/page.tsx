'use client'
import { logout } from "./logout";

export default function Logout() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div>La conexión a caducado.</div>
            <div className="mt-2">
                <button onClick={async () =>{await logout()}} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}
