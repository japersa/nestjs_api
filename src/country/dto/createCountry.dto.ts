import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}