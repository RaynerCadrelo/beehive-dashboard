import { getItems } from "@/app/lib/fetch"
import { Measurement } from "@/app/types"
import Link from "next/link"

async function getMeasurements(identifier: string) {
    const API_URL =  process.env.API_MEASUREMENT_URL as string
    return await getItems(API_URL, {identifier_beehive: identifier, limit: 10})
}

export default async function BeehivePage({ params }: {params: {identifier: string}}){
    const {identifier} = params
    const items: Array<Measurement> = await getMeasurements(identifier)
    if (items.length == 0){
        return(
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div>Colmenas sin mediciones registradas.</div>
            </div>
        )
    }
    return(
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-gray-900 rounded-md shadow-md max-w-max m-4">
                <table className="table-fixed border-collapse">
                    <thead>
                        <tr>
                            <th align="center" className="py-4 px-2 bg-gray-800 rounded-l-md">Fecha y Hora</th>
                            <th align="left" className="py-4 px-2 bg-gray-800">Temperatura (ºC)</th>
                            <th align="left" className="py-4 px-2 bg-gray-800">Humedad (%)</th>
                            <th align="left" className="py-4 px-2 bg-gray-800 rounded-r-md">Sonido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((row) => (
                            <tr key={row.id}>
                                <td align="center" className="py-2 px-2">{row.datetime.split("T").join(" ")}</td>
                                <td align="center" className="py-2 px-2">{(row.temperature/100).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
                                <td align="center" className="py-2 px-2">{(row.humidity/100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td align="center" className="py-2 px-2">
                                    <Link className="underline-offset-1 underline hover:underline-offset-4" href={"public/"+row.sound_token}>
                                        {row.sound_token}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
