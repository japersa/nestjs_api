import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiImplicitParam, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';

@ApiUseTags('clients')
@Controller('/api/clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The records has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getCities(@Response() res) {
        const cities = await this.clientService.findAll();
        return res.status(HttpStatus.OK).json(cities);
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiResponse({ status: 200, description: 'The record has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getClient(@Response() res, @Param() param) {
        const client = await this.clientService.findById(param.id);
        return res.status(HttpStatus.OK).json(client);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createClient(@Response() res, @Body() createClientDTO: CreateClientDto) {
        const client = await this.clientService.create(createClientDTO);
        return res.status(HttpStatus.OK).json(client);
    }

    @Patch('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiImplicitBody({ name: "body", required: true, type: CreateClientDto })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'The record does not exist.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async updateClient(@Param() param, @Response() res, @Body() body) {

        const client = await this.clientService.update(param.id, body);

        if (client) {
            return res.status(HttpStatus.OK).json(client);
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: 'client doesn\'t exist!' });
    }

}
