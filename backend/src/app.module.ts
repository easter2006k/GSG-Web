import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProgrammesModule } from './programmes/programmes.module';
import { CollegesModule } from './colleges/colleges.module';
import { CoursesModule } from './courses/courses.module';
import { ScholarshipsModule } from './scholarships/scholarships.module';
import { CounsellingModule } from './counselling/counselling.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { NewsModule } from './news/news.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProgrammesModule,
    CollegesModule,
    CoursesModule,
    ScholarshipsModule,
    CounsellingModule,
    VolunteersModule,
    NewsModule,
    TeamModule,
  ],
})
export class AppModule {}