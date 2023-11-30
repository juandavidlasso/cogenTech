import { Boss } from '@models/boss';
import { Employee } from '@models/employee';

export interface HistoryChange {
    id_history_change: number;
    empleado_id: number;
    jefe_id: number;
    fecha_actualizacion: string;
    version: number;
    dataEmployee: Employee;
    dataBoss: Boss;
}

export interface HistoryChangeForm {
    jefe_id: number;
}

export interface HistoryChangeResponse {
    id_history_change: number;
    empleado_id: number;
    jefe_id: number;
    version: number;
    fecha_actualizacion: string;
}

export interface GetHistoryChangeEmployeeResponse {
    getHistoryChangeEmployee: HistoryChange[];
}

export interface CreateHistoryChangeEmployeeResponse {
    createHistoryChange: HistoryChangeResponse;
}

export interface GetLastVersionEmployeeResponse {
    getLastVersionEmployee: number;
}
