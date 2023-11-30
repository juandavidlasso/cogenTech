import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BossService } from './boss.service';
import { BossResolver } from './boss.resolver';
import { Boss } from './entities/boss.entity';

@Module({
    imports: [SequelizeModule.forFeature([Boss])],
    providers: [BossResolver, BossService],
    exports: [BossService],
})
export class BossModule {}
