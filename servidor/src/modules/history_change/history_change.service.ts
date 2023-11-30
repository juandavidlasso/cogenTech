import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHistoryChangeInput } from './dto/create-history_change.input';
import { HistoryChange } from './entities/history_change.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Boss } from '../boss/entities/boss.entity';

@Injectable()
export class HistoryChangeService {
    constructor(
        @InjectModel(HistoryChange)
        private readonly historyChangeRepository: typeof HistoryChange,
    ) {}

    async createHistoryChangeService(
        createHistoryChangeInput: CreateHistoryChangeInput,
    ): Promise<HistoryChange> {
        try {
            return await this.historyChangeRepository.create(
                createHistoryChangeInput,
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async getHistoryChangeEmployeeService(
        id: number,
    ): Promise<HistoryChange[]> {
        try {
            const existeHistory = await this.historyChangeRepository.findOne({
                where: { empleado_id: id },
            });

            if (!existeHistory)
                throw new Error('No existe historial para este empleado');

            return await this.historyChangeRepository.findAll({
                where: { empleado_id: id },
                order: [['fecha_actualizacion', 'DESC']],
                attributes: [
                    'id_history_change',
                    'empleado_id',
                    'jefe_id',
                    'fecha_actualizacion',
                    'version',
                ],
                include: [
                    {
                        model: Employee,
                        as: 'dataEmployee',
                        required: true,
                        attributes: ['nombre', 'email', 'cargo'],
                    },
                    {
                        model: Boss,
                        as: 'dataBoss',
                        required: true,
                        attributes: ['nombre'],
                    },
                ],
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getLastVersionEmployeeService(id: number): Promise<number> {
        try {
            const existeHistory = await this.historyChangeRepository.findOne({
                where: { empleado_id: id },
            });

            if (!existeHistory)
                throw new Error('No existe historial para este empleado');

            return await this.historyChangeRepository.max('version', {
                where: { empleado_id: id },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
