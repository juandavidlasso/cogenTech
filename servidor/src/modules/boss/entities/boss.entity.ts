import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({
    timestamps: false,
    tableName: 'Boss',
})
export class Boss extends Model<Boss> {
    @Column({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    @Field(() => Int, { nullable: false })
    id_jefe: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    nombre: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    cargo: string;
}
