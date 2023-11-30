import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.input';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_empleado: number;
}
