import React, { useState } from 'react';
import Link from 'next/link';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '@config/queries';
import { GetEmployeesResponse } from '@models/employee';
import Alert from '@components/Alert';
import Employe from './components/Employee';
import Layout from '@views/layouts';

interface Props {}

const EmployeesManagement: React.FC<Props> = ({}) => {
    const { data, error } = useQuery<GetEmployeesResponse>(GET_EMPLOYEES);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(true);

    if (error)
        return (
            <Alert
                isOpen={showErrorMessage}
                setIsOpen={setShowErrorMessage}
                type="error"
                message={error.message}
            />
        );

    return (
        <Layout
            title="Gestión Empleados"
            pageDescription="Gestión de Empleados"
        >
            <Grid container spacing={0} padding={0}>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    pt={2}
                    pb={2}
                >
                    <Typography variant="h3" component="h1">
                        Gestion de Empleados
                    </Typography>
                </Grid>

                <Grid item xs={12} pt={2} pb={2}>
                    <Button variant="contained" color="primary" sx={{ ml: 4 }}>
                        <ChevronLeftOutlinedIcon />
                        <Link href="/">Atras</Link>
                    </Button>
                </Grid>

                <Grid item xs={12} padding={3}>
                    {data?.getEmployees.length === 0 ? (
                        <Typography
                            variant="h3"
                            component="h1"
                            className="text-center"
                        >
                            No hay empleados registrados
                        </Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            Nombre
                                        </TableCell>
                                        <TableCell align="left">
                                            Email
                                        </TableCell>
                                        <TableCell align="left">
                                            Cargo
                                        </TableCell>
                                        <TableCell align="left">Jefe</TableCell>
                                        <TableCell align="left">
                                            Versión Actual
                                        </TableCell>
                                        <TableCell align="left">
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.getEmployees.map((employee) => (
                                        <Employe
                                            key={employee.id_empleado}
                                            employee={employee}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </Layout>
    );
};

export default EmployeesManagement;
