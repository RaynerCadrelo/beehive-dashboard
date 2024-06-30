import { ButtonStandard } from "./components/Button";

export default function DashBoardLayout({ children }: { children: React.ReactNode }){
    return (
        <div>
            <nav className="sticky top-0 z-40 w-full">
                <div className="relative flex justify-between items-center p-4">
                    <div></div>
                        <ButtonStandard>Cerrar sesión</ButtonStandard> 
                </div>
            </nav>
            <div>
                {children}
            </div>
        </div>
    )
}
