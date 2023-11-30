import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HistoryChangeService } from './history_change.service';
import { HistoryChangeResolver } from './history_change.resolver';
import { HistoryChange } from './entities/history_change.entity';

@Module({
    imports: [SequelizeModule.forFeature([HistoryChange])],
    providers: [HistoryChangeResolver, HistoryChangeService],
    exports: [HistoryChangeService],
})
export class HistoryChangeModule {}
