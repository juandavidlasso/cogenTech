/** BOSS */

import { gql } from '@apollo/client';

export const CREATE_BOSS = gql`
    mutation CreateBoss($createBossInput: CreateBossInput!) {
        createBoss(createBossInput: $createBossInput) {
            id_jefe
            nombre
            email
            cargo
        }
    }
`;

/** EMPLOYEES */

export const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($createEmployeeInput: CreateEmployeeInput!) {
        createEmployee(createEmployeeInput: $createEmployeeInput) {
            id_empleado
            nombre
            email
            cargo
            jefe_id
        }
    }
`;

export const UPDATE_BOSS_EMPLOYEE = gql`
    mutation UpdateBossEmployee($updateEmployeeInput: UpdateEmployeeInput!) {
        updateBossEmployee(updateEmployeeInput: $updateEmployeeInput) {
            id_empleado
            nombre
            email
            cargo
            jefe_id
            dataBoss {
                id_jefe
                nombre
            }
        }
    }
`;

/** HISTORY CHANGE */

export const CREATE_HISTORY_CHANGE = gql`
    mutation CreateHistoryChange(
        $createHistoryChangeInput: CreateHistoryChangeInput!
    ) {
        createHistoryChange(
            createHistoryChangeInput: $createHistoryChangeInput
        ) {
            id_history_change
            empleado_id
            jefe_id
            version
            fecha_actualizacion
        }
    }
`;
