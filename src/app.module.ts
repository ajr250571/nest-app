import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, UsersModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
