import { GroupEntity } from "src/group/entities/group.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"

@Entity('tutor')
export class TutorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 100})
    name: string

    @Column()
    phone_tutor: string

    @Column()
    photo: string

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @JoinColumn()
    @ManyToOne(type => GroupEntity, grp => grp.students)
    group: GroupEntity
}
