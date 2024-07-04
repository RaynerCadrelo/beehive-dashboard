import React from "react";
import { ButtonCopy } from './components/ButtonCopy'
import Link from "next/link";
import { getBeehives } from "../service/item/beehive"
import { redirect } from "next/navigation";


export default async function DashBoard() {
    const beehives = await getBeehives()
    if (beehives === undefined){
        redirect("/logout")
    }
    if (beehives.length == 0){
        return(
            <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <div>Usurio sin colmenas</div>
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
