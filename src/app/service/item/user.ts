import { cookies } from "next/headers"
import { request } from "../fetch"


export async function getCurrentUser() {
    const API_URL =  process.env.API_USER_URL as string
    const username = cookies().get('username')
    if (username == undefined)
        return undefined
    return await request("GET", API_URL.concat("/",username.value))
}
