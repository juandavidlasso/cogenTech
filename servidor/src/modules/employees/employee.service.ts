import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';
import { Boss } from '../boss/entities/boss.entity';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee)
        private readonly employeeRepository: typeof Employee,
    ) {}

    async createEmployeeService(
        createEmployeeInput: CreateEmployeeInput,
    ): Promise<Employee> {
        try {
            const existeEmpleado = await this.employeeRepository.findOne({
                where: { email: createEmployeeInput.email },
            });

            if (existeEmpleado)
                throw new Error(
                    'Ya existe un empleado registrado con este email',
                );

            return await this.employeeRepository.create(createEmployeeInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getEmployeesService(): Promise<Employee[]> {
        try {
            return await this.employeeRepository.findAll({
                include: [
                    {
                        model: Boss,
                        as: 'dataBoss',
                        required: false,
                        attributes: ['id_jefe', 'nombre'],
                    },
                ],
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getEmployeeService(id: number): Promise<Employee> {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id_empleado: id },
            });

            if (!employee) throw new Error('El empleado no esta registrado');

            return await employee;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateBossEmployeeService(
        id: number,
        updateEmployeeInput: UpdateEmployeeInput,
    ) {
        try {
            const existsEmployee = await this.employeeRepository.findOne({
                where: { id_empleado: id },
            });

            if (!existsEmployee)
                throw new Error('El empleado no esta registrado.');

            return await existsEmployee.update(updateEmployeeInput);
        } catch (error) {
            throw new Error(error);
        }
    }
}
