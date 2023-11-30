import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateHistoryChangeInput {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    empleado_id: number;

    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    jefe_id: number;

    @Field(() => Number, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    version: number;
}
