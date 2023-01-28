import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create_user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const { email, password } = createUserDto
        const user = new this.userModel({ email, password })
        await user.save()
        return user
    }

    async findOne(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email })
        return user
    }


}
