import { Injectable } from '@nestjs/common';
import { Role, UserDocument } from 'src/users/user.schema';

@Injectable()
export class InstructorService {

    async becomeInstructor(user: UserDocument): Promise<{ success: boolean; message: string }> {
        try {
            const isInstructor = user.role.some((role) => {
                return role === Role.Instructor;
            })
            if (isInstructor) {
                return { success: false, message: "you are already instructor" }
            }
            user.role.push(Role.Instructor)
            await user.save()
            return { success: true, message: "You are now an instructor! Congratulations!" }
        } catch (e) {
            return { success: false, message: "Some thing went wrong, try later" }
        }
    }
}
