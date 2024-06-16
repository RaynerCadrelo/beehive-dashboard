import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './dashboard.module.css'
//import './dashboard.module.css'
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
            redirect("/login");
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
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th align="left">Nombre</th>
                        <th align="left">Identificador&nbsp;</th>
                        <th align="left">Provincia&nbsp;</th>
                        <th align="left">Municipio&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {beehives.map((row) => (
                        <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.identifier}</td>
                        <td>{row.location_provincia}</td>
                        <td>{row.location_municipio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
      );
  }