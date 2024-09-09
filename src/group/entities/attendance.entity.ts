import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { GroupEntity } from "./group.entity"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

@Entity('attendance')
export class AttendanceEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    groupId: string

    @Column()
    student_id: string

    @Column()
    attands: boolean

    @Column({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
    date: Date

    @JoinColumn()
    @ManyToOne(type => GroupEntity, grp => grp.attendances, {cascade: true})
    group: GroupEntity

}

export class CreateAttendanceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    student_id: string

    @ApiProperty({example: true})
    @IsBoolean()
    @IsNotEmpty()
    attands: boolean

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date: Date
}
