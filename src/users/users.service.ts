import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
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

    async findById(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id)
        return user
    }

    async getCourses(_id: Types.ObjectId, skip: number, limit?: number) {
        const user = await (await this.userModel.findById(_id)).populate({
            path: "courses",
            options: {
                limit: limit ? limit : 10,
                skip,
                sort: { updatedAt: -1 }
            }
        })
        return user.courses
    }

}
