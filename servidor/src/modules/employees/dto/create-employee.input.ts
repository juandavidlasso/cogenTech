import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    cargo: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    jefe_id?: number;
}
