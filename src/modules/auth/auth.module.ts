import { MailModule } from './../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET_KEY'), 
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    MailModule,
  ],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [
    AuthService,
    JwtModule, 
  ],
})
export class AuthModule {}