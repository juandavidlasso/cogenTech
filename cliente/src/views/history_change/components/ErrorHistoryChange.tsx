import { ApolloError } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import HistoryChangeForm from './EmployeeHistoryChangeForm';
import { GetHistoryChangeEmployeeResponse } from '@models/history_change';

interface Props {
    error: ApolloError | undefined;
}

const ErrorHistoryChange: React.FC<Props> = ({ error }) => {
    return (
        <>
            <Grid item xs={12} pt={2} pb={2}>
                <Typography
                    variant="h4"
                    component="h1"
                    className="text-center text-[#154360]"
                >
                    {error?.message}
                </Typography>
            </Grid>

            <Grid item xs={12} pt={2} pb={2}>
                <HistoryChangeForm />
            </Grid>
        </>
    );
};

export default ErrorHistoryChange;
