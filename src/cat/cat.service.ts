import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';
import {
  validate,
} from 'class-validator';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) { }
  async create(createCatDto: CreateCatDto) {
    const newCat = await this.catRepository.create({ ...createCatDto });
    const errors = await validate(newCat)
    if(errors.length > 0) {
      console.log('errors =============', errors);
      
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }else{
      return await this.catRepository.save(newCat);
    }
  }

  async findAll() {
    return await this.catRepository.find();
    // throw new HttpException('Server Error', HttpStatus.BAD_REQUEST)
    // throw new BadRequestException('Server Error')
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({ where: { id } })
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOne({ where: { id } });
    const newCat = await this.catRepository.merge(cat, { ...updateCatDto });
    return await this.catRepository.save(newCat);
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOne({ where: { id } })
    return await this.catRepository.remove(cat);
  }
}
