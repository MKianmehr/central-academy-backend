import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { User } from './user.schema';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersService.findOne(createUserDto.email)
        if (user) throw new BadRequestException('email in use')

        const newUser = await this.usersService.create(createUserDto)
        return newUser
    }

    async signIn() { }
}
