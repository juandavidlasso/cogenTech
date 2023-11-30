import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistoryChangeService } from './history_change.service';
import { HistoryChange } from './entities/history_change.entity';
import { CreateHistoryChangeInput } from './dto/create-history_change.input';

@Resolver(() => HistoryChange)
export class HistoryChangeResolver {
    constructor(private readonly historyChangeService: HistoryChangeService) {}

    @Mutation(() => HistoryChange, { name: 'createHistoryChange' })
    async createHistoryChange(
        @Args('createHistoryChangeInput')
        createHistoryChangeInput: CreateHistoryChangeInput,
    ): Promise<HistoryChange> {
        return await this.historyChangeService.createHistoryChangeService(
            createHistoryChangeInput,
        );
    }

    @Query(() => [HistoryChange], { name: 'getHistoryChangeEmployee' })
    async getHistoryChangeEmployee(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<HistoryChange[]> {
        return await this.historyChangeService.getHistoryChangeEmployeeService(
            id,
        );
    }

    @Query(() => Number, { name: 'getLastVersionEmployee' })
    async getLastVersionEmployee(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<number> {
        return await this.historyChangeService.getLastVersionEmployeeService(
            id,
        );
    }
}
