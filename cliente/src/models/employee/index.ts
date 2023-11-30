import { Boss } from '@models/boss';

export interface EmployeeForm {
    nombre: string;
    email: string;
    cargo: string;
    jefe_id?: number;
}

export interface Employee {
    id_empleado: number;
    nombre: string;
    email: string;
    cargo: string;
    jefe_id: number;
    dataBoss: Boss;
}

export interface CreateEmployeeResponse {
    createEmployee: Employee;
}

export interface GetEmployeesResponse {
    getEmployees: Employee[];
}

export interface GetEmployeeResponse {
    getEmployee: Employee;
}
