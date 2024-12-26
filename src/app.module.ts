import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SimpleMiddleware } from './common/middleware/simple.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    CatModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'gz-cynosdbmysql-grp-m2qxnxu9.sql.tencentcdb.com',
      port: 21351,
      username: 'root',
      password: 'fzz.950512',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,// 这个选项在生产环境中应该关闭，因为它会根据实体自动同步数据库结构
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware) // 使用中间件
     .forRoutes({path: 'cat', method: RequestMethod.GET}) // 指定路由及方法

    //  .exclude( // 排除指定路由
    //   { path: 'cats', method: RequestMethod.GET },
    //   { path: 'cats', method: RequestMethod.POST },
    //   'cats/(.*)',
    //  )
  }
}
