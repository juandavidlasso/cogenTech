import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHistoryChangeInput } from './create-history_change.input';

@InputType()
export class UpdateHistoryChangeInput extends PartialType(
    CreateHistoryChangeInput,
) {
    @Field(() => Int, { nullable: false })
    id_history_change: number;
}
