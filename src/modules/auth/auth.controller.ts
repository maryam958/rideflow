import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { RolesGuard } from './roles.guard';
// import { UserRole } from '../user/entities/user.entity';
// import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }


  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: { sub: number; role: string } }) {
    return req.user;
  }

//   @Get('driver-only')
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @Roles(UserRole.DRIVER)
//     driverOnly() {
//     return { message: 'Welcome, driver!' };
// }
}