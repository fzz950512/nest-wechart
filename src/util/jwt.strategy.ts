import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

/**
 * 实现jwt策略
 * 对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递
 */

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            //提供提取的jwt方法
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 选择默认的 false 设置，它将确保 JWT 没有过期的责任委托给 Passport 模块。
            // 这意味着，如果我们的路由提供了一个过期的 JWT ，请求将被拒绝，并发送 401 Unauthorized 的响应。
            ignoreExpiration: false,
            // 密钥，不要暴露出去
            secretOrKey: configService.get('JWT_SECRET')
            //   secretOrKey: jwtConstants.secret,
        } as StrategyOptions)
    }


    // payload {
    //     id: '4d8b498e-b743-46e4-bdf8-91c25212441b',
    //     userName: 'kerrywu',
    //     iat: 1688724765,
    //     exp: 1688739165
    //   }
    async validate(payload: any) {
        return {
            userId: payload.id,
            userName: payload.userName
        }
    }
}