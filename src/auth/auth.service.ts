import { encryptPwd, comparePwd } from './../util/bcryptjs';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  /**
  * 用户注册
  * @param createUserDto
  * @returns
  */
  async register(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    const { userName, passWord } = createUserDto
    const exitsUser = await this.userService.findByUserName(userName)

    if (exitsUser) {
      throw new BadRequestException('用户名已存在')
    }

    const errors = await validate(createUserDto)
    console.log('errors', errors);
    
    if (errors.length > 0) {
      console.log('errors =============', errors);

      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    } else {
      console.log('passWord.======', passWord, encryptPwd(passWord));

      const user = {
        ...createUserDto,
        passWord: encryptPwd(passWord), // 保存加密后的密码
      }
      console.log('encryptPwd(passWord)', encryptPwd(passWord));
      return await this.userService.create(user);
    }
  }
/**
   * 用户登录
   * @param createUserDto
   * @returns
   */
  async login(loginDto: CreateUserDto) {
    const existUser = await this.validateUser(loginDto)
    const token = this.createToken(existUser)
    return {
      userId: existUser.id,
      token
    }
  }

  /**
     * 校验登录用户
     * @param user
     * @returns
     */
  async validateUser(user) {
    const { userName, passWord } = user
    const existUser = await this.userService.findByUserName(userName)
    if(!existUser) {
      throw new BadRequestException('用户不存在')
    }
    const { passWord: encryptPwd} = existUser
    const isOk = comparePwd(passWord, encryptPwd)
    if(!isOk) {
      throw new BadRequestException('密码错误')
    }
    return existUser
    // return this.userService.findByUserName(userName, passWord)
  }

  /**
   * 创建token
   * @param user 用户信息
   * @returns 
   */
  createToken (user) {
    const payload = {
      id: user.id,
      userName: user.userName,
    }
    return this.jwtService.sign(payload)
  }
}

