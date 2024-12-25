import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type CatRoleType = "home" | "wild"

// type: ColumnType - 列类型。
// name: string - 数据库表中的列名。
// length: number - 列类型的长度。 例如，如果要创建varchar（150）类型
// nullable: boolean - 在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
// update: boolean - 指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
// select: boolean - 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
// default: string - 添加数据库级列的DEFAULT值。
// unique: boolean - 将列标记为唯一列（创建唯一约束）
// comment: string - 数据库列备注，并非所有数据库类型都支持。
// enum: string[]|AnyEnum - 在enum列类型中使用，以指定允许的枚举值列表。

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    @IsString()
    @IsNotEmpty({message: '请输入名字'})
    name: string;

    @Column()
    @IsNumber()
    @IsNotEmpty({message: '请输入年龄'})
    age: number;

    @Column()
    @IsString()
    @IsNotEmpty({message: '请输入种类'})
    breed: string;

    @Column({ type: "enum", enum: ['home', 'wild'] })
    @IsNotEmpty({message: '请输入角色'})
    role: CatRoleType;
}
