import { ButtonLogout } from '../dashboard/components/ButtonLogout';

export default function Logout() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div>La conexión a caducado.</div>
            <div className="mt-2">
                <ButtonLogout>Iniciar Sesión</ButtonLogout>
            </div>
        </div>
    );
}
