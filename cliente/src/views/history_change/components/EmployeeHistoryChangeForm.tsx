import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
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
import { CREATE_HISTORY_CHANGE, UPDATE_BOSS_EMPLOYEE } from '@config/mutations';
import {
    GET_BOSS,
    GET_EMPLOYEE,
    GET_EMPLOYEES,
    GET_HISTORY_CHANGE_EMPLOYEE,
    GET_LAST_VERSION,
} from '@config/queries';
import { GetBossResponse } from '@models/boss';
import { CreateEmployeeResponse, GetEmployeeResponse } from '@models/employee';
import {
    CreateHistoryChangeEmployeeResponse,
    GetLastVersionEmployeeResponse,
    HistoryChangeForm,
} from '@models/history_change';
import { AlertType } from '@models/UI';
import Alert from '@components/Alert';

const schema = yup.object({
    jefe_id: yup
        .number()
        .required('Debe seleccionar un jefe inmediato')
        .typeError('Debe seleccionar un jefe inmediato')
        .min(1, 'Debe seleccionar un jefe inmediato'),
});

interface Props {}

const EmployeeHistoryChangeForm: React.FC<Props> = ({}) => {
    const router = useRouter();
    const { data } = useQuery<GetEmployeeResponse>(GET_EMPLOYEE, {
        variables: { getEmployeeId: Number(router.query.id) },
    });
    const { data: dataVersion } = useQuery<GetLastVersionEmployeeResponse>(
        GET_LAST_VERSION,
        {
            variables: { getLastVersionEmployeeId: Number(router.query.id) },
        },
    );
    const { data: dataBoss } = useQuery<GetBossResponse>(GET_BOSS);
    const [createHistoryChange] =
        useMutation<CreateHistoryChangeEmployeeResponse>(CREATE_HISTORY_CHANGE);
    const [updateBossEmployee] =
        useMutation<CreateEmployeeResponse>(UPDATE_BOSS_EMPLOYEE);
    //
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<AlertType>('success');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<HistoryChangeForm>({
        resolver: yupResolver(schema),
    });

    const submitHistoryChange = async (dataForm: HistoryChangeForm) => {
        const { jefe_id } = dataForm;
        setSubmitting(true);

        try {
            await createHistoryChange({
                variables: {
                    createHistoryChangeInput: {
                        empleado_id: Number(router.query.id),
                        jefe_id,
                        version:
                            dataVersion === undefined
                                ? 1
                                : dataVersion.getLastVersionEmployee + 1,
                    },
                },
                refetchQueries: [
                    {
                        query: GET_HISTORY_CHANGE_EMPLOYEE,
                        variables: {
                            getHistoryChangeEmployeeId: Number(router.query.id),
                        },
                    },
                ],
            });

            await updateBossEmployee({
                variables: {
                    updateEmployeeInput: {
                        jefe_id,
                        id_empleado: Number(router.query.id),
                    },
                },
                refetchQueries: [
                    {
                        query: GET_LAST_VERSION,
                        variables: {
                            getLastVersionEmployeeId: Number(router.query.id),
                        },
                    },
                    { query: GET_EMPLOYEES },
                ],
            });

            setMessageType('success');
            setInfoMessage('Se ha asignado el jefe al empleado exitosamente.');
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
        <>
            <Alert
                isOpen={showMessage}
                setIsOpen={setShowMessage}
                message={infoMessage}
                type={messageType}
            />
            <form onSubmit={handleSubmit(submitHistoryChange)}>
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={4}>
                            <Typography
                                variant="h4"
                                component="h1"
                                className="text-center"
                            >
                                Actualizar Jefe
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                borderBottom: '1px solid gray',
                                textAlign: 'center',
                                padding: 2,
                            }}
                        >
                            <TextField
                                value={data?.getEmployee.nombre}
                                disabled
                                sx={{ width: '90%' }}
                                label="Nombre Empleado"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                borderBottom: '1px solid gray',
                                textAlign: 'center',
                                padding: 2,
                            }}
                        >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="jefe">
                                    Jefe Inmediato
                                </InputLabel>
                                <Select
                                    size="medium"
                                    id="jefe"
                                    label="Jefe Inmediato"
                                    {...register('jefe_id')}
                                    error={!!errors.jefe_id}
                                    defaultValue={0}
                                >
                                    <MenuItem value={0}></MenuItem>
                                    {dataBoss?.getBoss.map((boss) => (
                                        <MenuItem
                                            key={boss.id_jefe}
                                            value={boss.id_jefe}
                                        >
                                            {boss.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {!!errors.jefe_id && (
                                    <p className="text-[0.75rem] text-[#d32f2f] font-normal text-left mt-1 mr-[14px] mb-0 ml-[14px] leading-[1.66] tracking-[0.03333em]">
                                        {errors.jefe_id?.message}
                                    </p>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                borderBottom: '1px solid gray',
                                textAlign: 'center',
                                padding: 2,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={submitting}
                            >
                                Actualizar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </>
    );
};

export default EmployeeHistoryChangeForm;
