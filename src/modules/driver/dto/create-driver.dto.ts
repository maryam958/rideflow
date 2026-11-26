import { IsString, MinLength } from 'class-validator';


export class CreateDriverDto {
    @IsString()
    @MinLength(5)
    licenseNumber: string;
}
