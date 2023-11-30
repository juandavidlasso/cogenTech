import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    BelongsTo,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { Boss } from 'src/modules/boss/entities/boss.entity';

@ObjectType()
@Table({
    timestamps: false,
    tableName: 'Employees',
})
export class Employee extends Model<Employee> {
    @Column({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    @Field(() => Int, { nullable: false })
    id_empleado: number;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    nombre: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    @Field(() => String, { nullable: false })
    cargo: string;

    @Field(() => Int, { nullable: true })
    @Column({ allowNull: true, type: DataType.INTEGER })
    jefe_id?: number;

    @Field(() => Boss, { nullable: true })
    @BelongsTo(() => Boss, {
        as: 'dataBoss',
        foreignKey: 'jefe_id',
    })
    dataBoss?: Boss;
}
