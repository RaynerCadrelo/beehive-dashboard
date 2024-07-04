'use server'
import { redirect } from 'next/navigation'
import { logout } from "../service/auth";


export async function logoutSession() {
    await logout()
    redirect("/login")    
}
