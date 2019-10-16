import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator';
import { Department } from "src/department/entity/department.entity";

export class CreateCityDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly deparment: Department;
}