import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Department } from "src/department/entity/department.entity";
import { City } from "src/city/entity/city.entity";
import { Country } from "src/country/entity/country.entity";

export class CreateClientDto {
 
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly full_name: string;
    
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly nit: string;
  
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly address: string;
  
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly phone: string;
  
    @ApiModelProperty()
    @IsNumber()
    readonly credit_limit: number;
  
    @ApiModelProperty()
    @IsNumber()
    readonly available_credit: number;
  
    @ApiModelProperty()
    @IsNotEmpty()
    readonly city: City;
  
    @ApiModelProperty()
    @IsNotEmpty()
    readonly department: Department;
  
    @ApiModelProperty()
    @IsNotEmpty()
    readonly country: Country;

}