import Table from 'react-bootstrap/Table';
import  { useState } from 'react';

//Componente de tabla
export default function Tabla({filas}){
    return(
        <div 
            className="p-4"
            style={{
                marginLeft: "60px",
                marginRight: "60px",
                backgroundColor: "#111", // más oscuro que bg-dark
                borderRadius: "12px"
            }}
        >
            <Table hover responsive variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Historia de Usuario</th>
                        <th>Prioridad</th>
                        <th>Puntos</th>
                        <th>Criterios de Aceptación</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Agrega las filas correspondientes */
                    filas.map((fila,index) => (
                        <tr key={index}>
                            <td>{fila.id}</td>
                            <td>{fila.historia}</td>
                            <td>{fila.prioridad}</td>
                            <td>{fila.puntos}</td>
                            <td>{fila.criterios}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}