'use client'
import { logoutSession } from "@/app/logout/logout"

export function ButtonLogout({ children }: { children: React.ReactNode }){
    return (
        <button onClick={async () => {
            await logoutSession()
        }} className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-900">
            {children}
        </button>
    )
}