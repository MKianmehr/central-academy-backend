import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { LoginUserDto } from "./dtos/login_user.dto";

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.signUp(createUserDto)
        return user
    }

    @Post('/signin')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const user = await this.authService.signIn(loginUserDto)
        return user
    }
}