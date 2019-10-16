import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiImplicitParam, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/createCountry.dto';
import { CountryService } from './country.service';

@ApiUseTags('countries')
@Controller('/api/countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The records has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getCountrys(@Response() res) {
        const countrys = await this.countryService.findAll();
        return res.status(HttpStatus.OK).json(countrys);
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiResponse({ status: 200, description: 'The record has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getCountry(@Response() res, @Param() param) {
        const country = await this.countryService.findById(param.id);
        return res.status(HttpStatus.OK).json(country);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createCountry(@Response() res, @Body() createCountryDTO: CreateCountryDto) {
        const country = await this.countryService.create(createCountryDTO);
        return res.status(HttpStatus.OK).json(country);
    }

    @Patch('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiImplicitBody({ name: "body", required: true, type: CreateCountryDto })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'The record does not exist.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async updateCountry(@Param() param, @Response() res, @Body() body) {

        const country = await this.countryService.update(param.id, body);

        if (country) {
            return res.status(HttpStatus.OK).json(country);
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: 'country doesn\'t exist!' });
    }

}
