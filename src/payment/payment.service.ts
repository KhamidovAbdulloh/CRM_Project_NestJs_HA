import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { TutorEntity } from 'src/tutor/entities/tutor.entity';

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
    @InjectRepository(PaymentEntity) private paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(GroupEntity) private groupRepo: Repository<GroupEntity>,
    @InjectRepository(TutorEntity) private tutorRepo: Repository<TutorEntity>){}
    async create(createPaymentDto: CreatePaymentDto) {
        const student = await this.studentRepo.findOne({where: {id: createPaymentDto.studentsId}})
        if(!student) throw new NotFoundException('Such student does not exist!')
        const group = await this.groupRepo.findOne({where: {id: createPaymentDto.groupId}})
        if(!group) throw new NotFoundException('Such group does not exist!')
        const paid = await this.paymentRepo.findOne({where: {studentsId: student.id}, relations: ['group']})
        if(paid) throw new BadRequestException('This student allready paid to this group!')
        const tutor = await this.tutorRepo.findOne({where: {name: createPaymentDto.tutor_name}})
        if(!tutor) throw new BadRequestException('Name of tutor incorrect!')
        if(createPaymentDto.student_name.toLowerCase() !== student.name.toLowerCase()) throw new BadRequestException(`Name of student incorrect!`)
        if(createPaymentDto.phone_student !== student.phone_student) throw new BadRequestException('Phone number of student incorrect!')
        const payment = await this.paymentRepo.create(createPaymentDto)
        return await this.paymentRepo.save(payment)
  }

  async findAllPaidStudents() {
    return await this.paymentRepo.find()
  }
}
