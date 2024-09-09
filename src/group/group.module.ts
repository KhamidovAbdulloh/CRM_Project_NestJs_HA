import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutor/entities/tutor.entity';
import { AttendanceEntity } from './entities/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, StudentEntity, TutorEntity, AttendanceEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
