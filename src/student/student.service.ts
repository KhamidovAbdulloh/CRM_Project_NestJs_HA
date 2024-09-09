import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>){}
  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepo.create({group: {id: createStudentDto.groupId}, ...createStudentDto})
    return await this.studentRepo.save(student)
  }

  async findAll() {
    return await this.studentRepo.find()
  }

  async findOne(id: string) {
    const student = await this.studentRepo.findOneBy({id})
    if(!student) throw new NotFoundException('Student not found!')
    return student
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepo.findOneBy({id})
    if(!student) throw new NotFoundException('Student not found!')
    if(updateStudentDto.name) student.name = updateStudentDto.name
    if(updateStudentDto.phone_student) student.phone_student = updateStudentDto.phone_student
    if(updateStudentDto.photo) student.photo = updateStudentDto.photo
    if(updateStudentDto.parent_name) student.parent_name = updateStudentDto.parent_name
    if(updateStudentDto.parent_phone) student.parent_phone = updateStudentDto.parent_phone
    return await this.studentRepo.save(student)  
  }

  async remove(id: string) {
    const student = await this.studentRepo.findOneBy({id})
    if(!student) throw new NotFoundException('Student not found')
    return await this.studentRepo.save, "Student successfuly deleted!"
    
  }
}
