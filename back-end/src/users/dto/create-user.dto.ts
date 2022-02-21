import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @Length(3, 30)
    @IsNotEmpty()
    firstName: string

    @Length(3, 30)
    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    password: string

}
