import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { LoginUserDto } from './dtos/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserWithTokenDto } from './dtos/user-with-token.dto';
import { JWTPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<UserWithTokenDto> {
        const user = await this.usersService.findOne(createUserDto.email)
        if (user) throw new ConflictException('email in use')

        const newUser = await this.usersService.create(createUserDto)
        const payLoad: JWTPayload = { _id: newUser._id.toString() }
        const accessToken: string = await this.jwtService.signAsync(payLoad)
        return { user: newUser, accessToken }
    }

    async signIn(loginUserDto: LoginUserDto): Promise<UserWithTokenDto> {
        const { email, password } = loginUserDto
        const user = await this.usersService.findOne(email)

        if (user && await bcrypt.compare(password, user.password)) {
            const payLoad: JWTPayload = { _id: user._id.toString() }
            const accessToken: string = await this.jwtService.signAsync(payLoad)
            return { user, accessToken }
        }
        throw new UnauthorizedException('Please check your login credentials')
    }
}
