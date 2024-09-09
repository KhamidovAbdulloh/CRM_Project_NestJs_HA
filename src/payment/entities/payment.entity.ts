import { GroupEntity } from "src/group/entities/group.entity"
import { StudentEntity } from "src/student/entities/student.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    studentsId: string

    @Column()
    groupId: string

    @Column({length: 100})
    student_name: string

    @Column()
    phone_student: string

    @Column({length: 100})
    tutor_name: string

    @Column({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    date_pay: Date

    @JoinColumn()
    @ManyToOne(type => GroupEntity, grp => grp.payments, {cascade: true})
    group: GroupEntity

    @JoinColumn()
    @ManyToOne(type => StudentEntity, std => std.payments, {cascade: true})
    students: StudentEntity
}
