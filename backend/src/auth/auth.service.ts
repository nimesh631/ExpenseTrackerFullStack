import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
            @InjectRepository(User)  private users: Repository<User>,
            private jwt:JwtService,
    ){}

    async register(dto: RegisterDto){
        try{
            const exist = await this.users.findOne({where:{email: dto.email}});
            if(exist){
                throw new ConflictException("email cannot be used already exist");
            }

            const hash = await bcrypt.hash(dto.password,10);
            const user = this.users.create({email: dto.email, password: hash});
            await this.users.save(user);
            return this.signToken(user);
        }
        catch(err){
            console.error('Register Error:',err);
            throw err;
        }

    }

    async login(dto:LoginDto){
    const user = await this.users.findOne({where:{email:dto.email}});
    if(!user) throw new UnauthorizedException('Invalid credential');

    const ok = await bcrypt.compare(dto.password, user.password);
    if(!ok) throw new UnauthorizedException('Invalid credential');
    
    return this.signToken(user);
    }

    private signToken(user:User){
        const payload = {sub:user.id, email: user.email};
        return {access_token: this.jwt.sign(payload)};
    }
}
