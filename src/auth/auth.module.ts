import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'
import { JwtStrategy } from 'src/util/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

// 注册JwtModule
// const jwtModule = JwtModule.register({
//   secret: jwtConstants.secret,
//   signOptions: { expiresIn: '60s' }, // 单位：120ms/60s/4h/7d
// });
const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '4h' }, // token 过期时间 单位：120ms/60s/4h/7d
      }
    }
})

@Module({
  imports: [jwtModule, PassportModule, UserModule],
  controllers: [AuthController],
  exports: [jwtModule], // 导出jwtModule，以便其他模块使用
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
