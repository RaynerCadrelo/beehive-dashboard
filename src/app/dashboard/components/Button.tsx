'use client'
import { logout } from "../../logout/logout"

export function ButtonStandard({children}: {children: string}){
    return (
        <button onClick={async () => {await logout()}} className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-gray-900">
            {children}
        </button>
    )
}
