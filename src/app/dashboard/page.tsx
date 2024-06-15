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
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-max m-4">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Identificador&nbsp;</TableCell>
                    <TableCell align="right">Provincia&nbsp;</TableCell>
                    <TableCell align="right">Municipio&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {beehives.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.identifier}</TableCell>
                    <TableCell align="right">{row.location_provincia}</TableCell>
                    <TableCell align="right">{row.location_municipio}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        </div>
      );
  }