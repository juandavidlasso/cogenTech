import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBossInput } from './create-boss.input';

@InputType()
export class UpdateBossInput extends PartialType(CreateBossInput) {
    @Field(() => Int, { nullable: false })
    @IsNotEmpty()
    @IsNumber()
    id_jefe: number;
}
