// import { IsString, IsInt } from 'class-validator';
import { Cat } from "../interfaces/cat.interface";

export class CreateCatDto implements Cat {
//   @IsString()
  name: string;

//   @IsInt()
  age: number;

//   @IsString()
  breed: string;
}
