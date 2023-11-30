import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Boss } from 'src/modules/boss/entities/boss.entity';
import { Employee } from 'src/modules/employees/entities/employee.entity';

@ObjectType()
@Table({
    timestamps: false,
    tableName: 'history_change',
})
export class HistoryChange extends Model<HistoryChange> {
    @Column({
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    @Field(() => Int, { nullable: false })
    id_history_change: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Employee)
    @Column({ allowNull: false, type: DataType.INTEGER })
    empleado_id: number;

    @Field(() => Int, { nullable: false })
    @ForeignKey(() => Boss)
    @Column({ allowNull: false, type: DataType.INTEGER })
    jefe_id: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    @Field(() => Number, { nullable: false })
    version: number;

    @Field(() => Date, { nullable: false })
    @Column({
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.NOW(),
    })
    fecha_actualizacion: string;

    @Field(() => Employee)
    @BelongsTo(() => Employee, {
        as: 'dataEmployee',
        foreignKey: 'empleado_id',
    })
    dataEmployee: Employee;

    @Field(() => Boss)
    @BelongsTo(() => Boss, { as: 'dataBoss', foreignKey: 'jefe_id' })
    dataBoss: Boss;
}
