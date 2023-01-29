import { Body, Controller, HttpCode, Post, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { LoginUserDto } from "./dtos/login_user.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NestExceptionDto } from "./dtos/nest-exception.dto";
import { ClassValidatorExceptionDto } from "./dtos/class-validator-exception.dto";
import { User } from "./user.schema";
import { UserDto } from "./dtos/user.dto";
import { SignOutDto } from "./dtos/signout.dto";

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService) { }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiCreatedResponse({ type: UserDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto, @Session() session: any): Promise<User> {
        const userWithToken = await this.authService.signUp(createUserDto)
        session.token = userWithToken.accessToken
        return userWithToken.user
    }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiOkResponse({ type: UserDto })
    @HttpCode(200)
    @Post('/signin')
    async loginUser(@Body() loginUserDto: LoginUserDto, @Session() session: any): Promise<User> {
        const userWithToken = await this.authService.signIn(loginUserDto)
        session.token = userWithToken.accessToken
        return userWithToken.user
    }

    @ApiOkResponse({ type: SignOutDto })
    @Post('/signout')
    signOut(@Session() session: any): SignOutDto {
        session = session.token = null
        return { success: true }
    }

}