import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react";
import { ButtonCopy } from './components/CopyButton'
import { Beehive } from "../types";
import { getItems } from "../lib/fetch";
import Link from "next/link";

async function getBeehives() {
    const API_URL =  process.env.API_BEEHIVE_URL as string
    const username = cookies().get('username')
    if (username == undefined)
        redirect("/")
    return await getItems(API_URL, {username_owner: username.value, limit: 1000, desc: false})
}

export default async function DashBoard() {
    const beehives: Array<Beehive>|undefined = await getBeehives()
    if (beehives === undefined){
        return(
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div>Data no found</div>
            </div>
        )
    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-gray-900 rounded-md shadow-md max-w-max m-4">
            <table className="table-fixed border-collapse">
                <thead>
                    <tr>
                        <th align="left" className="py-4 px-2 bg-gray-800 rounded-l-md">Nombre</th>
                        <th align="left" className="py-4 px-2 bg-gray-800">Identificador</th>
                        <th align="left" className="py-4 px-2 bg-gray-800">Provincia</th>
                        <th align="left" className="py-4 px-2 bg-gray-800 rounded-r-md">Municipio</th>
                    </tr>
                </thead>
                <tbody>
                    {beehives.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <Link className="underline-offset-1 underline hover:underline-offset-4" href={"dashboard/beehive/"+row.identifier}>
                                    {row.name}
                                </Link>
                            </td>
                            <td align="right" className="py-2 px-2">{"... " + row.identifier.substr(row.identifier.length - 6)}
                                <ButtonCopy text={row.identifier}></ButtonCopy>
                            </td>
                            <td className="py-2 px-2">{row.location_provincia}</td>
                            <td className="py-2 px-2">{row.location_municipio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
      );
  }