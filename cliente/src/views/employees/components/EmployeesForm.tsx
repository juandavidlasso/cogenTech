import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from '@components/Loader';
import {
    GET_BOSS,
    GET_EMPLOYEES,
    GET_HISTORY_CHANGE_EMPLOYEE,
} from '@config/queries';
import { AlertType } from '@models/UI';
import { GetBossResponse } from '@models/boss';
import { CreateEmployeeResponse, EmployeeForm } from '@models/employee';
import Alert from '@components/Alert';
import { CREATE_EMPLOYEE, CREATE_HISTORY_CHANGE } from '@config/mutations';
import Layout from '@views/layouts';
import { CreateHistoryChangeEmployeeResponse } from '@models/history_change';

const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    email: yup
        .string()
        .required('El email es requerido')
        .email('El email no tiene el formato correcto'),
    cargo: yup.string().required('El cargo es requerido'),
});

interface Props {}

const EmployeesForm: React.FC<Props> = ({}) => {
    const { data, error } = useQuery<GetBossResponse>(GET_BOSS);
    const [createEmployee] =
        useMutation<CreateEmployeeResponse>(CREATE_EMPLOYEE);
    const [createHistoryChange] =
        useMutation<CreateHistoryChangeEmployeeResponse>(CREATE_HISTORY_CHANGE);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(true);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EmployeeForm>({
        resolver: yupResolver(schema),
    });

    if (error)
        return (
            <Alert
                isOpen={showErrorMessage}
                setIsOpen={setShowErrorMessage}
                type="error"
                message={error.message}
            />
        );

    const submitEmployee = async (dataForm: EmployeeForm) => {
        const { nombre, email, cargo, jefe_id } = dataForm;
        setSubmitting(true);

        const obj =
            jefe_id?.toString() === '0'
                ? {
                      nombre,
                      email,
                      cargo,
                  }
                : {
                      nombre,
                      email,
                      cargo,
                      jefe_id,
                  };

        try {
            // Creo el empleado
            const { data } = await createEmployee({
                variables: {
                    createEmployeeInput: obj,
                },
                refetchQueries: [{ query: GET_EMPLOYEES }],
            });

            // Creo el historial para el empleado
            if (jefe_id?.toString() !== '0') {
                await createHistoryChange({
                    variables: {
                        createHistoryChangeInput: {
                            empleado_id: data?.createEmployee.id_empleado,
                            jefe_id,
                            version: 1,
                        },
                    },
                    refetchQueries: [
                        {
                            query: GET_HISTORY_CHANGE_EMPLOYEE,
                            variables: {
                                getHistoryChangeEmployeeId:
                                    data?.createEmployee.id_empleado,
                            },
                        },
                    ],
                });
            }

            setMessageType('success');
            setInfoMessage('El empleado se ha registrado exitosamente.');
            setShowMessage(true);
            setSubmitting(false);
            reset();
            setValue('jefe_id', 0);
        } catch (error) {
            if (error instanceof ApolloError) {
                setMessageType('error');
                setInfoMessage(error.message.replace('Error:', ''));
                setShowMessage(true);
                setSubmitting(false);
                return;
            }
            setMessageType('error');
            setInfoMessage(error as string);
            setShowMessage(true);
            setSubmitting(false);
            return;
        }
    };

    return (
        <Layout
            title="Registro de empleados"
            pageDescription="Formulario de registro"
        >
            <Alert
                isOpen={showMessage}
                setIsOpen={setShowMessage}
                message={infoMessage}
                type={messageType}
            />
            <form onSubmit={handleSubmit(submitEmployee)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '40%',
                        margin: '0 auto',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registro de Empleados
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    label="Nombre"
                                    {...register('nombre')}
                                    error={!!errors.nombre}
                                    helperText={errors.nombre?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="email"
                                    label="Email"
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    label="Cargo"
                                    {...register('cargo')}
                                    error={!!errors.cargo}
                                    helperText={errors.cargo?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="jefe">
                                        Jefe Inmediato
                                    </InputLabel>
                                    <Select
                                        size="medium"
                                        id="jefe"
                                        label="Jefe Inmediato"
                                        {...register('jefe_id')}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}></MenuItem>
                                        {data?.getBoss.map((boss) => (
                                            <MenuItem
                                                key={boss.id_jefe}
                                                value={boss.id_jefe}
                                            >
                                                {boss.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2, width: 250 }}
                                disabled={submitting}
                            >
                                {submitting ? <Loader /> : 'Registrar'}
                            </Button>
                            <Link href="/">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2, width: 250 }}
                                >
                                    Cancelar
                                </Button>
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </form>
        </Layout>
    );
};

export default EmployeesForm;
