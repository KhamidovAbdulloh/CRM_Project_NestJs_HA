import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { TutorEntity } from 'src/tutor/entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, GroupEntity, StudentEntity, TutorEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
