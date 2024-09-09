import { PaymentEntity } from "src/payment/entities/payment.entity"
import { StudentEntity } from "src/student/entities/student.entity"
import { TutorEntity } from "src/tutor/entities/tutor.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { AttendanceEntity } from "./attendance.entity"


@Entity('group')
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 100})
    name: string

    @OneToMany(type => StudentEntity, std => std.group)
    students: StudentEntity[]

    @OneToMany(type => TutorEntity, tut => tut.group)
    tutors: TutorEntity[]

    @OneToMany(type => PaymentEntity, pay => pay.group)
    payments: PaymentEntity[]

    @OneToMany(type => AttendanceEntity, att => att.group)
    attendances: AttendanceEntity[]

}
