import { BadRequestException, ConflictException, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { LoginUserDto } from './dtos/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserWithTokenInterface } from './interfaces/user-with-token.interface';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { Role, UserDocument } from './user.schema';
import { AWSService } from 'src/aws/aws.service';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private awsService: AWSService,
        private configService: ConfigService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<UserWithTokenInterface> {
        const user = await this.usersService.findOne(createUserDto.email)
        if (user) throw new ConflictException('email in use')

        const newUser = await this.usersService.create(createUserDto)
        const payLoad: JWTPayload = { _id: newUser._id.toString() }
        const accessToken: string = await this.jwtService.signAsync(payLoad)
        return { user: newUser, accessToken }
    }

    async signIn(loginUserDto: LoginUserDto): Promise<UserWithTokenInterface> {
        const { email, password } = loginUserDto
        const user = await this.usersService.findOne(email)

        if (user && await bcrypt.compare(password, user.password)) {
            const payLoad: JWTPayload = { _id: user._id.toString() }
            const accessToken: string = await this.jwtService.signAsync(payLoad)
            return { user, accessToken }
        }
        throw new UnauthorizedException('Please check your login credentials')
    }

    async validateUserByToken(token: string): Promise<UserDocument> {
        try {
            const payLoad: JWTPayload = await this.jwtService.verifyAsync(token)
            const user = await this.usersService.findById(payLoad._id)
            return user
        } catch (e) {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }

    async forgetPassword(email: string) {
        const user = await this.usersService.findOne(email)
        if (!user) {
            throw new BadRequestException("Email not found. Please register or enter a valid email")
        }
        const payLoad: JWTPayload = { _id: user._id.toString() }
        const resetCode: string = await this.jwtService.signAsync(payLoad, { expiresIn: '24h' })
        user.passwordResetCode = resetCode
        await user.save()
        const domain = this.configService.get("CLIENT_DOMAIN")
        const url = `${domain}/user/email-password-change?reset_code=${resetCode}`
        try {
            this.awsService.sendEmail(email, `Hi ${user.name ? user.name : ""}`, url)
            return { success: true, message: "Reset password email sent" }
        } catch (e) {
            throw new ServiceUnavailableException("Please try again later")
        }
    }

    async emailPasswordChange(resetCode: string, password: string) {
        const { _id }: JWTPayload = await this.jwtService.verifyAsync(resetCode)
        const user = await this.usersService.findById(_id)
        if (!user) throw new NotFoundException("User not found.")
        if (user.passwordResetCode !== resetCode) throw new NotFoundException("Incorrect reset code")
        user.password = password;
        user.passwordResetCode = ""
        const payLoad: JWTPayload = { _id: user._id.toString() }
        const accessToken: string = await this.jwtService.signAsync(payLoad)
        await user.save()
        return { success: true, message: "Password successfully changed", user, accessToken }
    }

    async becomeInstructor(user: UserDocument): Promise<{ success: boolean; message: string }> {
        const isInstructor = user.role.some((role) => {
            return role === Role.Instructor;
        })
        if (isInstructor) {
            throw new ConflictException("you are already instructor")
        }
        user.role.push(Role.Instructor)
        await user.save()
        return { success: true, message: "You are now an instructor! Congratulations!" }
    }

    async isInstructor() { }
}