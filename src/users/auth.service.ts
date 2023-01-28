import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { User } from './user.schema';
import { LoginUserDto } from './dtos/login_user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersService.findOne(createUserDto.email)
        if (user) throw new ConflictException('email in use')

        const newUser = await this.usersService.create(createUserDto)
        return newUser
    }

    async signIn(loginUserDto: LoginUserDto): Promise<User> {
        const { email, password } = loginUserDto
        const user = await this.usersService.findOne(email)

        if (user && await bcrypt.compare(password, user.password)) {
            return user
        }
        throw new UnauthorizedException('Please check your login credentials')
    }
}
