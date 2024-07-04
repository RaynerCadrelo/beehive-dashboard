import { cookies } from "next/headers"
import { getItems } from "../fetch"
import { Beehive } from "@/app/types"


export async function getBeehives(username_owner: string="", limit: number=1000, desc: boolean=false): Promise<Array<Beehive> | undefined> {
    const API_URL =  process.env.API_BEEHIVE_URL as string
    if (username_owner == ""){
        const username = cookies().get('username')
        if (username == undefined)
            return undefined
        username_owner = username.value
    }
    return await getItems(API_URL, {username_owner: username_owner, limit: limit, desc: desc})
}