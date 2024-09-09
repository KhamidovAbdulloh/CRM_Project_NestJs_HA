import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateAttendanceDto } from './entities/attendance.entity';

export class StudentTutorGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string
}

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Post('createAttendance')
  createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.groupService.createAttendance(createAttendanceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findGroupById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @Get('students/:id')
  findStudentsOfGroup(@Param('id') id: string) {
    return this.groupService.findStudentsOfGroup(id);
  }

  @Get('tutor/:id')
  findTutorOfGroup(@Param('id') id: string) {
    return this.groupService.findTutorOfGroup(id);
  }

  @Patch('DeleteStudentFromGroup/:id')
  removeStudentFromGroup(@Param('id') id: string, @Body() studentId: StudentTutorGroupDto) {
    return this.groupService.removeStudentFromGroup(id, studentId);
  }

  @Patch('DeleteTutorFromGroup/:id')
  removeTutorFromGroup(@Param('id') id: string, @Body() tutorId: StudentTutorGroupDto) {
    return this.groupService.removeTutorFromGroup(id, tutorId);
  }

  @Patch('addStudentToGroup/:id')
  addStudentToGroup(@Param('id') id: string, @Body() studentId: StudentTutorGroupDto) {
    return this.groupService.addStudentToGroup(id, studentId);
  }

  @Patch('addTutorToGroup/:id')
  addTutorToGroup(@Param('id') id: string, @Body() tutorId: StudentTutorGroupDto) {
    return this.groupService.addTutorToGroup(id, tutorId);
  }

}
