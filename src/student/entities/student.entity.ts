import { GroupEntity } from "src/group/entities/group.entity"
import { PaymentEntity } from "src/payment/entities/payment.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 100})
    name: string

    @Column()
    phone_student: string

    @Column()
    photo: string

    @Column({length: 100})
    parent_name: string

    @Column()
    parent_phone: string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @JoinColumn()
    @ManyToOne(type => GroupEntity, grp => grp.students)
    group: GroupEntity

    @OneToMany(type => PaymentEntity, pay => pay.students)
    payments: PaymentEntity[]
}
