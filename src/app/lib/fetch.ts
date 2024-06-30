import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function request(method: string, url: string | URL,  options?: any) {
    const token = cookies().get('jwt')
    if (token === undefined)
        redirect("/")
    const headers = {'accept': 'application/json', 'Authorization': 'Bearer '.concat(token.value)}
    return await fetch(url, {
        method: method,
        headers: headers,
        cache: 'no-cache',
        ...options,
    })
}

export async function getToken(url: string | URL, body: FormData) {
    const headers = {'accept': 'application/json'}
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        cache: 'no-cache',
        body: body
    })
}

export async function getItems(url: string, params = {}) {
    const url_api = new URL(url)
    url_api.search = new URLSearchParams(params).toString()
    const response = await request('GET', url_api, {})
    if (response.status == 401){
        redirect("/logout")
    }else if(response.status == 404){
        return []
    }else if(response.status != 200){
        return undefined
    }
    return await response.json()
}

export async function getCurrentUser() {
    const API_URL =  process.env.API_USER_URL as string
    const username = cookies().get('username')
    if (username == undefined)
        redirect("/")
    return await request("GET", API_URL.concat("/",username.value))
}
