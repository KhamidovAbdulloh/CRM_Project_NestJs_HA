import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateTutorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
    //@IsPhoneNumber()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_tutor: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    photo: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupId: string
}
