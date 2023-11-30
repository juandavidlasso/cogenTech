import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BossService } from './boss.service';
import { Boss } from './entities/boss.entity';
import { CreateBossInput } from './dto/create-boss.input';

@Resolver(() => Boss)
export class BossResolver {
    constructor(private readonly bossService: BossService) {}

    @Mutation(() => Boss, { name: 'createBoss' })
    async createBoss(
        @Args('createBossInput') createBossInput: CreateBossInput,
    ): Promise<Boss> {
        return await this.bossService.createBossService(createBossInput);
    }

    @Query(() => [Boss], { name: 'getBoss' })
    async getBoss(): Promise<Boss[]> {
        return await this.bossService.getBossService();
    }
}
