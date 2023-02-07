import { Body, Controller, Get, HttpCode, Param, Post, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create_user.dto";
import { LoginUserDto } from "./dtos/login_user.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { NestExceptionDto } from "./dtos/nest-exception.dto";
import { ClassValidatorExceptionDto } from "./dtos/class-validator-exception.dto";
import { User, UserDocument } from "./user.schema";
import { UserDto } from "./dtos/user.dto";
import { SignOutDto } from "./dtos/signout.dto";
import { UserGuard } from "./guards/user.guard";
import { GetUser } from "./decorators/current-user.decorator";
import { ForgetPasswordDto } from "./dtos/forget-password.dto";
import { ForgetPasswordResDto } from "./dtos/forget-password-res.dto";
import { EmailPasswordChangeDto } from "./dtos/email-pass-change.dto";
import { EmailPasswordChangeResDto } from "./dtos/email-pass-change-res.dto";
import { InstructorGuard } from "src/instructor/guards/instructor.guard";
import { BecomeInstructorResDto } from "./dtos/become-instructor-res.dto";


@Controller('auth')
export class UsersController {
    constructor(
        private authService: AuthService,
    ) { }

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
    @HttpCode(200)
    @Post('/signout')
    signOut(@Session() session: any): SignOutDto {
        session.token = null
        return { success: true }
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiOkResponse({ type: UserDto })
    @UseGuards(UserGuard)
    @Get('/whoami')
    whoAmI(@GetUser() user: User): User {
        return user
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @UseGuards(UserGuard)
    @Get('/isloggedin')
    isLoggedIn() { }


    @ApiBadRequestResponse({ type: NestExceptionDto })
    @ApiOkResponse({ type: ForgetPasswordResDto })
    @HttpCode(200)
    @Post('/forget-password')
    async forgetPassword(@Body() body: ForgetPasswordDto) {
        return this.authService.forgetPassword(body.email)
    }

    @ApiBadRequestResponse({ type: ClassValidatorExceptionDto })
    @ApiOkResponse({ type: EmailPasswordChangeResDto })
    @HttpCode(200)
    @ApiNotFoundResponse({ type: NestExceptionDto })
    @Post('/email-password-change/:resetcode')
    async emailPasswordChange(@Body() body: EmailPasswordChangeDto, @Param('resetcode') resetCode: string, @Session() session: any) {
        const res = await this.authService.emailPasswordChange(resetCode, body.password)
        session.token = res.accessToken
        delete res.accessToken
        const resultToSend = res
        return resultToSend
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiConflictResponse({ type: NestExceptionDto })
    @ApiCreatedResponse({ type: BecomeInstructorResDto })
    @UseGuards(UserGuard)
    @Post('/become-instructor')
    async becomeInstructor(@GetUser() user: UserDocument) {
        return this.authService.becomeInstructor(user)
    }

    @ApiUnauthorizedResponse({ type: NestExceptionDto })
    @ApiOkResponse()
    @UseGuards(InstructorGuard)
    @Get('/is-instructor')
    isInstructor() { }

}