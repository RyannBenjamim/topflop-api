import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ReviewsModule,
    MoviesModule
  ],
})
export class AppModule {}
