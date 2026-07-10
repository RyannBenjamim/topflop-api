import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service'; 
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserResponseFromPrisma } from '../users/prisma/users.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, 
    private readonly mailService: MailService,
  ) {}

  async signin(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const passwordMath = await bcrypt.compare(password, user.password);
    if (!passwordMath) throw new UnauthorizedException('Credenciais inválidas.');

    if (!user.emailVerified) {
      throw new UnauthorizedException({
        message: 'Email não verificado.',
        error: 'EmailNotVerified'
      });
    }
    
    const payload = { id: user.id, role: user.role }
    const token = await this.jwtService.signAsync(payload)

    return { access_token: token }
  }

  async generateAndSendToken(
    userId: string, 
    email: string, 
    username: string
  ): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 3);

    await this.prisma.emailVerificationToken.deleteMany({
      where: { userId }
    });

    await this.prisma.emailVerificationToken.create({
      data: {
        token,
        expiresAt,
        userId,
      },
    });

    await this.mailService.sendEmailVerification(email, username, token);
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseFromPrisma> {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
    if (existingUser) throw new ConflictException('Esse e-mail já foi cadastrado.');

    const existingUsername = await this.usersService.findOneByUsername(createUserDto.username);
    if (existingUsername) throw new ConflictException('Esse username não está disponível.');

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const modifiedUser = {
      ...createUserDto, 
      password: hashPassword,
    }

    const createdUser = await this.usersService.create(modifiedUser);

    await this.generateAndSendToken(
      createdUser.id, 
      createdUser.email, 
      createdUser.username
    );

    return createdUser;
  }

  async sendNewToken(email: string): Promise<void> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');

    if (existingUser.emailVerified) {
      throw new BadRequestException('Este e-mail já foi verificado.');
    }

    await this.generateAndSendToken(
      existingUser.id,
      existingUser.email,
      existingUser.username
    );
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const verificationToken = await this.prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      throw new NotFoundException('Token de verificação inválido.');
    }

    const now = new Date();
    if (verificationToken.expiresAt < now) {
      await this.prisma.emailVerificationToken.delete({ where: { id: verificationToken.id } });
      throw new BadRequestException('Este token já expirou. Solicite uma nova verificação.');
    }

    await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true },
    });

    await this.prisma.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    await this.mailService.sendWelcome(verificationToken.user.email, verificationToken.user.username);

    return { message: 'E-mail verificado com sucesso! Sua conta está ativa.' };
  }
}