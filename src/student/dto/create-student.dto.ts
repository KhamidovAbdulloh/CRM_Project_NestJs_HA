import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_student: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    photo: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    parent_name: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    parent_phone: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupId: string
}
