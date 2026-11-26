import { IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MinLength(3)
  plateNumber: string;

  @IsString()
  model: string;

  @IsString()
  color: string;
}