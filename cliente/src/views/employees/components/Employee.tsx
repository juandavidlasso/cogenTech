import React from 'react';
import Link from 'next/link';
import { Button, TableCell, TableRow } from '@mui/material';
import { Employee } from '@models/employee';
import { useQuery } from '@apollo/client';
import { GET_LAST_VERSION } from '@config/queries';
import { GetLastVersionEmployeeResponse } from '@models/history_change';

interface Props {
    employee: Employee;
}

const Employe: React.FC<Props> = ({ employee }) => {
    const { id_empleado, nombre, email, cargo, dataBoss } = employee;

    const { data } = useQuery<GetLastVersionEmployeeResponse>(
        GET_LAST_VERSION,
        { variables: { getLastVersionEmployeeId: id_empleado } },
    );

    return (
        <TableRow key={id_empleado}>
            <TableCell component="th" scope="row">
                {nombre}
            </TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{cargo}</TableCell>
            <TableCell align="left">
                {dataBoss ? dataBoss.nombre : ''}
            </TableCell>
            <TableCell align="left">
                {data === undefined ? 0 : data.getLastVersionEmployee}
            </TableCell>
            <TableCell align="left">
                <Button
                    sx={{
                        background: '#7B241C !important',
                        color: '#FFFFFF !important',
                        textTransform: 'none',
                    }}
                    className="hover:!bg-red-700"
                >
                    <Link href={`history_change/${id_empleado}`}>
                        Ver Historial
                    </Link>
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default Employe;
