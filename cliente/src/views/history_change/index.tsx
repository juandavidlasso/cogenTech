import React from 'react';
import Link from 'next/link';
import { Grid, Button } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_HISTORY_CHANGE_EMPLOYEE } from '@config/queries';
import { GetHistoryChangeEmployeeResponse } from '@models/history_change';
import Layout from '@views/layouts';
import ErrorHistoryChange from './components/ErrorHistoryChange';
import EmployeeHistoryChange from './components/EmployeeHistoryChange';

interface Props {}

const HistoryChange: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { data, error } = useQuery<GetHistoryChangeEmployeeResponse>(
        GET_HISTORY_CHANGE_EMPLOYEE,
        {
            variables: {
                getHistoryChangeEmployeeId: Number(router.query.id ?? 0),
            },
        },
    );

    return (
        <Layout
            title="Actualizar Jefe"
            pageDescription="Actualizar Jefe del Empleado"
        >
            <Grid container spacing={0} padding={0}>
                <Grid item xs={12} pt={2} pb={2}>
                    <Link href="/employees">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ ml: 4 }}
                        >
                            <ChevronLeftOutlinedIcon />
                            Atras
                        </Button>
                    </Link>
                </Grid>

                {error ? (
                    <ErrorHistoryChange error={error} />
                ) : (
                    data !== undefined && <EmployeeHistoryChange data={data} />
                )}
            </Grid>
        </Layout>
    );
};

export default HistoryChange;
