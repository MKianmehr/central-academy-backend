import { Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/users/decorators/current-user.decorator';
import { UserGuard } from 'src/users/guards/user.guard';
import { UserDocument } from 'src/users/user.schema';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
    constructor(
        private instructorService: InstructorService
    ) { }

    @UseGuards(UserGuard)
    @Post('/become-instructor')
    async becomeInstructor(@GetUser() user: UserDocument) {
        return this.instructorService.becomeInstructor(user)
    }
}
