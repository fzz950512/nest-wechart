import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * 实体（Entity）类通常用于定义数据库模型，
 * 而数据传输对象（DTO）用于处理客户端与服务器之间的数据交换。
 * 根据最佳实践，验证逻辑应该放在DTO中，而不是实体（Entity）中
 * 
 * 几个原因：

    解耦：DTOs将验证逻辑与数据库模型（Entity）解耦，使得数据处理更加灵活。
    重用性：DTOs可以在多个地方重用，例如在不同的控制器或服务中，
        而实体通常与特定的数据库表绑定。
    安全性：避免将数据库字段直接暴露给客户端，特别是在涉及到敏感信息如密码时。
    灵活性：DTOs允许你定义客户端应该发送的数据结构，而不是数据库的结构。
 */

@Entity('db_user')
export class User {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        type: 'varchar',
        length: 50,
        comment: '用户名'
    })
    userName: string;
    
    @Exclude({ toPlainOnly: true }) //排除在普通对象中，但不会排除在JSON中
    @Column({
        type: 'varchar',
        length: 100,
        comment: '密码'
    })
    passWord: string;

    @Column({
        type: 'varchar',
        length: 50,
        comment: '昵称',
        nullable: true, //可以为空
    })
    nickName: string;

    @Column({
        type: 'datetime',
        comment: '生日',
        nullable: true, //可以为空
    })
    birthday: Date;

    @Column({
        type: 'varchar',
        length: 50,
        comment: '邮箱',
        nullable: true, //可以为空
    })
    email: string;

    @Column({
        name: 'create_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '创建时间',
    })
    createdAt: Date;

    @Column({
        name: 'update_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '更新时间',
    })
    updatedAt: Date;
}
