import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { User } from "./user.schema";

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.authService.signUp(createUserDto)
        return user
    }
}