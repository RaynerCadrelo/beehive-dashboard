'use server'
import { cookies } from "next/headers";

export async function request(method: string, url: string | URL,  options?: any) {
    const token = cookies().get('jwt')
    if (token === undefined)
        return undefined
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

export async function getItems(url: string, params = {}): Promise<Array<any>|undefined> {
    const url_api = new URL(url)
    url_api.search = new URLSearchParams(params).toString()
    const response = await request('GET', url_api, {})
    if (response === undefined || response.status == 401){
        return undefined
    }else if(response.status == 404){
        return []
    }
    return await response.json()
}