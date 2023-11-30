import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBossInput } from './dto/create-boss.input';
import { Boss } from './entities/boss.entity';

@Injectable()
export class BossService {
    constructor(
        @InjectModel(Boss)
        private readonly bossRepository: typeof Boss,
    ) {}

    async createBossService(createBossInput: CreateBossInput): Promise<Boss> {
        try {
            const boss = await this.bossRepository.findOne({
                where: { email: createBossInput.email },
            });

            if (boss)
                throw new Error(
                    'Ya existe un jefe registrado con este mismo email',
                );

            return await this.bossRepository.create(createBossInput);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getBossService(): Promise<Boss[]> {
        try {
            return await this.bossRepository.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }
}
