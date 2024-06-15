import { cookies } from "next/headers";


export async function login(formData: FormData) {
    // Create the session
    const API_TOKEN_URL =  process.env.API_TOKEN_URL
    if (API_TOKEN_URL === undefined)
        return
    const response = await fetch(API_TOKEN_URL, {
        method: 'POST',
        headers: { "accept": "application/json"},
        cache: 'no-cache',
        body: formData
    })
    const token = await response.json()
    console.log(token)
    // Clear cookies
    cookies().delete('jwt')
    cookies().delete('username')
    // Save the session in a cookie
    cookies().set('jwt', token['access_token'], {
        maxAge: 60 * 15, // 15 minutes in seconds
        httpOnly: true, // prevent client-side access
        sameSite: 'strict', // prevent cross-site requests
    });
    // Save the session in a cookie
    cookies().set('username', 'pepito', {
        maxAge: 60 * 15, // 15 minutes in seconds
        httpOnly: true, // prevent client-side access
        sameSite: 'strict', // prevent cross-site requests
    });

  }
