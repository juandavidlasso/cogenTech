import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { Employee } from './modules/employees/entities/employee.entity';
import { EmployeeModule } from './modules/employees/employee.module';
import { Boss } from './modules/boss/entities/boss.entity';
import { BossModule } from './modules/boss/boss.module';
import { HistoryChange } from './modules/history_change/entities/history_change.entity';
import { HistoryChangeModule } from './modules/history_change/history_change.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        // GRaphQL
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),

        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost', //process.env.DB_HOST_DEV,
            port: 3306, //+process.env.DB_PORT_DEV,
            username: 'root', //process.env.DB_USERNAME_DEV,
            database: 'cogentech', //process.env.DB_DATABASE_DEV,
            models: [Employee, Boss, HistoryChange],
        }),

        EmployeeModule,

        BossModule,

        HistoryChangeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
