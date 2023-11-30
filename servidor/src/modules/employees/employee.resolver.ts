import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private readonly employeesService: EmployeeService) {}

    @Mutation(() => Employee, { name: 'createEmployee' })
    async createEmployee(
        @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
    ): Promise<Employee> {
        return await this.employeesService.createEmployeeService(
            createEmployeeInput,
        );
    }

    @Query(() => [Employee], { name: 'getEmployees' })
    async getEmployees(): Promise<Employee[]> {
        return await this.employeesService.getEmployeesService();
    }

    @Query(() => Employee, { name: 'getEmployee' })
    async getEmployee(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Employee> {
        return await this.employeesService.getEmployeeService(id);
    }

    @Mutation(() => Employee, { name: 'updateBossEmployee' })
    async updateBossEmployee(
        @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
    ) {
        return this.employeesService.updateBossEmployeeService(
            updateEmployeeInput.id_empleado,
            updateEmployeeInput,
        );
    }
}
