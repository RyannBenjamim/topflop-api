import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MailModule } from './modules/mail/mail.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { FollowsModule } from './modules/follows/follows.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    UsersModule,
    MailModule,
    PrismaModule,
    ReviewsModule,
    CinemaModule,
    FollowsModule,
    CommentsModule,
    LikesModule
  ],
})
export class AppModule {}
