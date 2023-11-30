import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBossInput {
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
}
