import { Controller } from '@nestjs/common';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
    constructor(
        private instructorService: InstructorService
    ) { }


}
