import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
// 绑定拦截器ClassSerializerInterceptor，返回结果过滤掉password
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto)
  }
}
