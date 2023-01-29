import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from 'bcrypt';


export type UserDocument = HydratedDocument<User>

export enum Role {
    Subscriber = 'subscriber',
    Instructor = 'instructor',
    Admin = 'admin'
}

@Schema({ timestamps: true })
export class User {

    @Prop({ trim: true })
    name: string;

    @Prop({ trim: true })
    lastName: string;

    @Prop({ unique: true, required: true, trim: true })
    email: string;

    @Prop({ trim: true, required: true })
    password: string;

    @Prop({ default: '/avatar.png' })
    picture: string;

    @Prop({
        type: [String],
        default: [Role.Subscriber.toString()],
        enum: Object.values(Role)

    })
    role: Role[];

    @Prop({ default: "" })
    stripe_account_id: string;

    @Prop({ type: {}, default: {} })
    stripe_seller: object;

    @Prop({ type: {}, default: {} })
    stripeSession: object;

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

UserSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});
