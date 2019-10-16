import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator';
import { Country } from "src/country/entity/country.entity";

export class CreateDepartmentDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly country: Country;
}