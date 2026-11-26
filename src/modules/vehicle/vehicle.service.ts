import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { Driver } from '../driver/entities/driver.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>, 
  ) {}

     async create(userId: number, dto: CreateVehicleDto) {
    const driver = await this.driverRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!driver) {
      throw new ForbiddenException('You are not registered as a driver');
    }

    const existing = await this.vehicleRepository.findOne({
      where: { plateNumber: dto.plateNumber },
    });

    if (existing) {
      throw new ConflictException('Plate number already in use');
    }

    const vehicle = this.vehicleRepository.create({ ...dto, driver });
    return this.vehicleRepository.save(vehicle);
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
