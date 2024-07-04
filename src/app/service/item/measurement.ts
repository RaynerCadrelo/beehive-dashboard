import { Measurement } from "@/app/types"
import { getItems } from "../fetch"


export async function getMeasurements(identifier: string, limit=10, offset=0): Promise<Array<Measurement>|undefined> {
    const API_URL =  process.env.API_MEASUREMENT_URL as string
    return await getItems(API_URL, {identifier_beehive: identifier, limit: limit, offset: offset})
}
