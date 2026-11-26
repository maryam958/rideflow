import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,Request } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('driver')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Request() req:{user: {sub:number}},
    @Body() dto: CreateDriverDto) {
    return this.driverService.create(req.user.sub, dto);
  }







  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
