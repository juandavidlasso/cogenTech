import { gql } from '@apollo/client';

/** BOSS */

export const GET_BOSS = gql`
    query GetBoss {
        getBoss {
            id_jefe
            nombre
            email
            cargo
        }
    }
`;

/** EMPLOYEES */

export const GET_EMPLOYEES = gql`
    query GetEmployees {
        getEmployees {
            id_empleado
            nombre
            email
            cargo
            dataBoss {
                id_jefe
                nombre
            }
        }
    }
`;

export const GET_EMPLOYEE = gql`
    query GetEmployee($getEmployeeId: Int!) {
        getEmployee(id: $getEmployeeId) {
            id_empleado
            nombre
            email
            cargo
            jefe_id
        }
    }
`;

/** HISTORY CHANGE */

export const GET_HISTORY_CHANGE_EMPLOYEE = gql`
    query GetHistoryChangeEmployee($getHistoryChangeEmployeeId: Int!) {
        getHistoryChangeEmployee(id: $getHistoryChangeEmployeeId) {
            id_history_change
            empleado_id
            jefe_id
            version
            fecha_actualizacion
            dataEmployee {
                nombre
                email
                cargo
            }
            dataBoss {
                nombre
            }
        }
    }
`;

export const GET_LAST_VERSION = gql`
    query Query($getLastVersionEmployeeId: Int!) {
        getLastVersionEmployee(id: $getLastVersionEmployeeId)
    }
`;
