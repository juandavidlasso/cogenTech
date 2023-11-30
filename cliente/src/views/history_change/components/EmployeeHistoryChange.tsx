import { Grid, Typography } from '@mui/material';
import React from 'react';
import EmployeeHistoryChangeForm from './EmployeeHistoryChangeForm';
import ListHistoryChange from './ListHistoryChange';
import { GetHistoryChangeEmployeeResponse } from '@models/history_change';

interface Props {
    data: GetHistoryChangeEmployeeResponse | undefined;
}

const EmployeeHistoryChange: React.FC<Props> = ({ data }) => {
    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                pt={2}
                pb={2}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    className="text-[#154360]"
                >
                    Historial de Cambios - Empleado{' '}
                    {data?.getHistoryChangeEmployee[0].dataEmployee.nombre}
                </Typography>
            </Grid>

            <Grid item xs={12} pt={2} pb={2}>
                <EmployeeHistoryChangeForm />
            </Grid>

            <Grid item xs={12} pt={2} pb={2} padding={4}>
                <ListHistoryChange data={data} />
            </Grid>
        </>
    );
};

export default EmployeeHistoryChange;
