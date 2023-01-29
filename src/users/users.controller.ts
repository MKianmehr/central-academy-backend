import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { LoginUserDto } from "./dtos/login_user.dto";
import { UserWithTokenDto } from "./dtos/user-with-token.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NestExceptionDto } from "./dtos/nest-exception.dto";
import { ClassValidatorExceptionDto } from "./dtos/class-validator-exception.dto";
import { GetUser } from "./decorators/current-user.decorator";
import { UserGuard } from "./guards/user.guard";

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService) { }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiCreatedResponse({ type: UserWithTokenDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserWithTokenDto> {
        const user = await this.authService.signUp(createUserDto)
        return user
    }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiOkResponse({ type: UserWithTokenDto })
    @HttpCode(200)
    @Post('/signin')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserWithTokenDto> {
        const user = await this.authService.signIn(loginUserDto)
        return user
    }

    @Get('/test')
    @UseGuards(UserGuard)
    async test(@GetUser() user) {
        console.log("req", user)
    }

}