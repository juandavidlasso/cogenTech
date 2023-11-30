import { HistoryChange } from '@models/history_change';
import { Button, Link, TableCell, TableRow } from '@mui/material';
import React, { version } from 'react';

interface Props {
    history: HistoryChange;
}

const ItemHistoryChange: React.FC<Props> = ({ history }) => {
    const {
        id_history_change,
        dataBoss,
        dataEmployee,
        fecha_actualizacion,
        version,
    } = history;
    return (
        <TableRow key={id_history_change}>
            <TableCell component="th" scope="row">
                {dataEmployee.nombre}
            </TableCell>
            <TableCell align="left">{dataEmployee.email}</TableCell>
            <TableCell align="left">{dataEmployee.cargo}</TableCell>
            <TableCell align="left">{dataBoss.nombre}</TableCell>
            <TableCell align="left">{version}</TableCell>
            <TableCell align="left">{fecha_actualizacion}</TableCell>
        </TableRow>
    );
};

export default ItemHistoryChange;
