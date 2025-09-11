import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // put in .env
      signOptions: { expiresIn: '7d' }, // 1 day
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // in case other modules need it
})
export class AuthModule {}
