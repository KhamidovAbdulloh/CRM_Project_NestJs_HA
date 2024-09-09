import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    studentsId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    student_name: string
    
    @ApiProperty({example: 'example: +998945345431'})
    @IsString()
    @IsNotEmpty()
    phone_student: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tutor_name: string

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    date_pay: Date
}
