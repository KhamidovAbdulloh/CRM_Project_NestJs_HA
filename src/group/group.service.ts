import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutor/entities/tutor.entity';
import { StudentTutorGroupDto } from './group.controller';
import { AttendanceEntity, CreateAttendanceDto } from './entities/attendance.entity';

@Injectable()
export class GroupService {
  constructor(
  @InjectRepository(GroupEntity) private groupRepo: Repository<GroupEntity>,
  @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
  @InjectRepository(TutorEntity) private tutorRepo: Repository<TutorEntity>,
  @InjectRepository(AttendanceEntity) private attendanceRepo: Repository<AttendanceEntity>){}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.groupRepo.findOne({where: {name: createGroupDto.name}})
    if(group) throw new BadRequestException('Such whith name group allready exist!')
    const newGroup = this.groupRepo.create(createGroupDto)
    return await this.groupRepo.save(newGroup)
  }

  async findAll() {
    return await this.groupRepo.find() 
  }
  async findGroupById(id: string) {
    const group = await this.groupRepo.findOneBy({id})
    if(!group) throw new NotFoundException('No such group found!')
    return group
  }

  async findStudentsOfGroup(id: string) {
    const group = await this.groupRepo.findOne({where: {id}, relations: {students: true}})
    if(!group) throw new NotFoundException('No such group found!')
    return group
  }

  async findTutorOfGroup(id: string) {
    const group = await this.groupRepo.findOne({where: {id}, relations: {tutors: true}})
    if(!group) throw new NotFoundException('No such group found!')
    return group
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepo.findOneBy({id})
    if(!group) throw new NotFoundException('No such group found!')
    if(updateGroupDto.name) group.name = updateGroupDto.name
    return await this.groupRepo.save(group)
  }

  async remove(id: string) {
    const group = await this.groupRepo.findOneBy({id})
    if(!group) throw new NotFoundException('Group not found')
    return await this.groupRepo.delete({id}), "Group successfuly deleted!"
  }

  async removeStudentFromGroup(id: string, studentId: StudentTutorGroupDto) {
    const studentID = (await this.studentRepo.findOne({where: studentId}))
    if(!studentID) throw new NotFoundException('Such student not found!')
    const groupID = (await this.groupRepo.findOne({where: {id}, relations: ['students']}))
    if(!groupID) throw new NotFoundException('Such group not found!')
    const ggg = groupID.students.find((id) => {
      if(id.id === studentID.id) {
        return true
    }})
    if(ggg) {
      groupID.students = groupID.students.filter(groupId => groupId.id !== studentID.id) 
      return await this.groupRepo.save(groupID), `Student '${studentID.name}' successfuly deleted from this group!`
    }else {return new NotFoundException(`Student '${studentID.name}' does not exist in this group!`)}
  }

  async removeTutorFromGroup(id: string, tutorId: StudentTutorGroupDto) {
    const tutorID = (await this.tutorRepo.findOne({where: tutorId}))
    if(!tutorID) throw new NotFoundException('Such tutor not found!')
    const groupID = (await this.groupRepo.findOne({where: {id}, relations: ['tutors']}))
    if(!groupID) throw new NotFoundException('Such group not found!')
    const ggg = groupID.tutors.find((id) => {
      if(id.id === tutorID.id) {
        return true
    }})
    if(ggg) {
      groupID.tutors = groupID.tutors.filter(groupId => groupId.id !== tutorID.id) 
      return await this.groupRepo.save(groupID), `Tutor '${tutorID.name}' successfuly deleted from this group!`
    }else {return new NotFoundException(`Tutor '${tutorID.name}' does not exist in this group!`)}
  }

  async addStudentToGroup(id: string, studentId: StudentTutorGroupDto) {
    const studentID = await this.studentRepo.findOneBy(studentId)
    if(!studentID) throw new NotFoundException('Such student not found!')
    const groupID = await this.groupRepo.findOne({where: {id}, relations: ['students']})
    if(!groupID) throw new NotFoundException('Such group not found!')
    const ggg = groupID.students.find((id) => {
      if(id.id === studentID.id) {
        return true
    }})
    if(ggg) {
      throw new BadRequestException('You already added this student to this group!')
    }else {
      groupID.students.push(studentID)
      return await this.groupRepo.save(groupID)
    }
  }

  async addTutorToGroup(id: string, tutorId: StudentTutorGroupDto) {
    const tutorID = await this.tutorRepo.findOneBy(tutorId)
    if(!tutorID) throw new NotFoundException('Such tutor not found!')
    const groupID = await this.groupRepo.findOne({where: {id}, relations: ['tutors']})
    if(!groupID) throw new NotFoundException('Such group not found!')
    const ggg = groupID.tutors.find((id) => {
      if(id.id === tutorID.id) {
        return true
    }})
    if(ggg) {
      throw new BadRequestException('You already added this tutor to this group!')
    }else {
      groupID.tutors.push(tutorID)
      return await this.groupRepo.save(groupID)
    }
  }

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    const student = await this.studentRepo.findOne({where: {id: createAttendanceDto.student_id}})
    if(!student) throw new NotFoundException('Such student does not exist!')
    const group = await this.groupRepo.findOne({where: {id: createAttendanceDto.groupId}})
    if(!group) throw new NotFoundException('Such group does not exist!')
    const existAttendance = await this.attendanceRepo.findOne({where: {student_id: student.id}, relations: ['group']})
    if(existAttendance) throw new BadRequestException('Allready made attendance to this student!')
    const attend = await this.attendanceRepo.create(createAttendanceDto)
    return await this.attendanceRepo.save(attend)
  }
}
