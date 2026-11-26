import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { User, UserRole } from '../user/entities/user.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateDriverDto) {
    const existing = await this.driverRepository.findOne({
      where: { 
        user: {
          id: userId
        } },
    });

    if (existing) {
      throw new ConflictException('You are already registered as a driver');
    }

    const driver = this.driverRepository.create({
      licenseNumber: dto.licenseNumber,
      user: { id: userId },
    });
    const saved =await this.driverRepository.save(driver);

    await this.userRepository.update(userId,{role:UserRole.DRIVER});
    return saved;
    // return this.driverRepository.save(driver);
  }

  findAll() {
    return `This action returns all driver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
