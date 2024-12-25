import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpCode, Redirect, HttpException, HttpStatus, ParseIntPipe, Module, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  // @Get('ab*cd') 路由通配符 只有express 支持
  // @HttpCode(200) 设置状态码
  // @Redirect('https://nestjs.com') 重定向
  // @Header('Cache-Control', 'none') 自定义标头
  findAll(@Req() req: Request): Promise<any>{
    /**
     *  @Req req: request
     *  @Response(), @Res()*	res
        @Next()	next
        @Session()	req.session
        @Param(key?: string)	req.params / req.params[key]
        @Body(key?: string)	req.body / req.body[key]
        @Query(key?: string)	req.query / req.query[key]
        @Headers(name?: string)	req.headers / req.headers[name]
        @Ip()	req.ip
        @HostParam()	req.hosts
     */
    return this.catService.findAll()
    // throw new HttpException('not_found', HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  // 带参数的路由应在任何静态路径之后声明。这可以防止参数化路径拦截发往静态路径的流量。
  findOne(@Param('id', ParseIntPipe) id: string, @Query('name') name: string) {
    console.log('name', name);
    
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
