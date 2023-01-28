import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { LoginUserDto } from "./dtos/login_user.dto";
import { UserWithTokenDto } from "./dtos/user-with-token.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ExceptionDto } from "./dtos/exception.dto";
import { ClassValidatorException } from "./dtos/class-validator-exception.dto";

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService) { }

    @ApiBadRequestResponse({ type: ClassValidatorException })
    @ApiCreatedResponse({ type: UserWithTokenDto })
    @ApiConflictResponse({ type: ExceptionDto })
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserWithTokenDto> {
        const user = await this.authService.signUp(createUserDto)
        return user
    }

    @ApiBadRequestResponse({ type: ClassValidatorException })
    @ApiUnauthorizedResponse({ type: ExceptionDto })
    @HttpCode(200)
    @Post('/signin')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserWithTokenDto> {
        const user = await this.authService.signIn(loginUserDto)
        return user
    }
}