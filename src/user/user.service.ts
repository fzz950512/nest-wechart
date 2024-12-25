import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /**
   * 创建新用户
   */
  async create(createUserDto: CreateUserDto) {
    const {userName} = createUserDto;
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return await this.findByUserName(userName);
  }

  findAll() {

    return this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    return this.mapToUserDto(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  /**
   * 根据用户名查询用户信息
   * @param userName
   * @returns
   */
  async findByUserName(userName: string) {
    return await this.userRepository.findOne({
      where: { userName }
    })
  }

  private mapToUserDto(user: User): UserDto {
    const { id, userName, nickName, email, birthday, createdAt, updatedAt } = user;
  
    return {
      id,
      userName,
      nickName,
      email,
      birthday: birthday ? birthday.toLocaleString() : null, // 假设 birthday 已经是 Date 类型
      createTime: createdAt.getTime(), // 假设 createdAt 已经是 Date 类型
      updateTime: updatedAt.getTime(), // 假设 updatedAt 已经是 Date 类型
    };
  }
}
