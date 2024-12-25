import { IsNotEmpty, IsString } from "class-validator";

/**
 * 实体（Entity）类通常用于定义数据库模型，
 * 而数据传输对象（DTO）用于处理客户端与服务器之间的数据交换。
 * 根据最佳实践，验证逻辑应该放在DTO中，而不是实体（Entity）中
 */

export class CreateUserDto {
    id: number;

    @IsString()
    @IsNotEmpty({ message: "用户名不能为空" })
    userName: string;

    @IsNotEmpty({ message: "密码不能为空" })
    passWord: string;
    nickName: string;
    email: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
}
