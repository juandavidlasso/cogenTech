import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { Employee } from './entities/employee.entity';

@Module({
    imports: [SequelizeModule.forFeature([Employee])],
    providers: [EmployeeResolver, EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
