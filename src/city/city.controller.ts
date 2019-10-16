import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiImplicitParam, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';
import { CreateCityDto } from './dto/createCity.dto';
import { CityService } from './city.service';

@ApiUseTags('cities')
@Controller('/api/cities')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The records has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getCities(@Response() res) {
        const cities = await this.cityService.findAll();
        return res.status(HttpStatus.OK).json(cities);
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiResponse({ status: 200, description: 'The record has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getCity(@Response() res, @Param() param) {
        const city = await this.cityService.findById(param.id);
        return res.status(HttpStatus.OK).json(city);
    }

    @Get('/department/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiResponse({ status: 200, description: 'The records has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findByFilterDepartment(@Response() res, @Param() param) {
        const city = await this.cityService.findByFilterDepartment(param.id);
        return res.status(HttpStatus.OK).json(city);
    }


    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createCity(@Response() res, @Body() createCityDTO: CreateCityDto) {
        const city = await this.cityService.create(createCityDTO);
        return res.status(HttpStatus.OK).json(city);
    }

    @Patch('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiImplicitBody({ name: "body", required: true, type: CreateCityDto })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'The record does not exist.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async updateCity(@Param() param, @Response() res, @Body() body) {

        const city = await this.cityService.update(param.id, body);

        if (city) {
            return res.status(HttpStatus.OK).json(city);
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: 'city doesn\'t exist!' });
    }

}
