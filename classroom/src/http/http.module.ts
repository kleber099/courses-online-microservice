import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';
import { TestResolver } from './test.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.reolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolve';
import { StudentsResolver } from './graphql/resolvers/students.reolver';
import { EnrollmentsService } from './graphql/services/enrollments.service';
import { CoursesService } from './graphql/services/courses.service';
import { StudentsService } from './graphql/services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [TestController],
  providers: [
    // resolvers
    TestResolver,
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    //services
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
