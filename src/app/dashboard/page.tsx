import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react";
import { CopyButton } from './components/CopyButton'

async function getBeehives() {
    const API_URL =  process.env.API_BEEHIVE_URL
    const username = cookies().get('username')
    const token = cookies().get('jwt')
    if (token === undefined || username === undefined || API_URL === undefined)
        return undefined
    const headers = {'accept': 'application/json', 'Authorization': 'Bearer '.concat(token.value)};
    const url = new URL(API_URL)
    url.search = new URLSearchParams({username_owner: username.value, limit: "500"}).toString()
    try {
        const response = await fetch(url, {headers: headers})
        if (response.status == 401){
            redirect("/login")
        }else if(response.status == 404){
            return []
        }else if(response.status != 200){
            return undefined
        }
        return await response.json()
    } catch (error){
        return undefined
    }
}

export default async function DashBoard() {
    const beehives = await getBeehives()
    if (beehives === undefined){
        return(
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div>Data no found</div>
            </div>
        )
    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-gray-800 rounded-md shadow-md lg:max-w-max m-4">
            <table className="table-fixed border-collapse">
                <thead>
                    <tr>
                        <th align="left" className="py-4 px-2 bg-gray-700 rounded-l-md">Nombre</th>
                        <th align="left" className="py-4 px-2 bg-gray-700">Identificador</th>
                        <th align="left" className="py-4 px-2 bg-gray-700">Provincia</th>
                        <th align="left" className="py-4 px-2 bg-gray-700 rounded-r-md">Municipio</th>
                    </tr>
                </thead>
                <tbody>
                    {beehives.map((row) => (
                        <tr key={row.id}>
                            <td className="py-2 px-2">{row.name}</td>
                            <td align="right" className="py-2 px-2">{"... " + row.identifier.substr(row.identifier.length - 6)}
                                <CopyButton text={row.identifier}></CopyButton>
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