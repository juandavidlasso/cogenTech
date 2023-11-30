import React from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { GetHistoryChangeEmployeeResponse } from '@models/history_change';
import ItemHistoryChange from './ItemHistoryChange';

interface Props {
    data: GetHistoryChangeEmployeeResponse | undefined;
}

const ListHistoryChange: React.FC<Props> = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Nombre Empleado</TableCell>
                        <TableCell align="left">Email Empleado</TableCell>
                        <TableCell align="left">Cargo</TableCell>
                        <TableCell align="left">Nombre Jefe</TableCell>
                        <TableCell align="left">Versión</TableCell>
                        <TableCell align="left">Fecha actualización</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.getHistoryChangeEmployee.map((history) => (
                        <ItemHistoryChange
                            key={history.id_history_change}
                            history={history}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListHistoryChange;
