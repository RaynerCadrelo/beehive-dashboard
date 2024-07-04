'use server'
import { getToken } from './fetch';
import { setCookies } from './cookies'
import { cookies } from "next/headers";

export async function logout() {
    cookies().delete("jwt")
    cookies().delete("username")
}

export async function login(formData: FormData) {
    // Create the session
    const API_TOKEN_URL =  process.env.API_TOKEN_URL as string
    const response = await getToken(API_TOKEN_URL, formData)
    if(response.status != 200)
        return false
    const token = await response.json()
    // Save the session in a cookie
    setCookies('jwt', token['access_token'])
    setCookies('username', formData.get('username') as string)
    return true
}