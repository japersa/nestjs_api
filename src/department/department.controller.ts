import { Controller, Get, Response, HttpStatus, Param, Body, Post, Request, Patch, Delete } from '@nestjs/common';
import { ApiResponse, ApiImplicitParam, ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';
import { CreateDepartmentDto } from './dto/createDepartment.dto';
import { DepartmentService } from './department.service';

@ApiUseTags('departments')
@Controller('/api/departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The records has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getDepartments(@Response() res) {
        const departments = await this.departmentService.findAll();
        return res.status(HttpStatus.OK).json(departments);
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiResponse({ status: 200, description: 'The record has been successfully found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async getDepartment(@Response() res, @Param() param) {
        const department = await this.departmentService.findById(param.id);
        return res.status(HttpStatus.OK).json(department);
    }

    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createDepartment(@Response() res, @Body() createDepartmentDTO: CreateDepartmentDto) {
        const department = await this.departmentService.create(createDepartmentDTO);
        return res.status(HttpStatus.OK).json(department);
    }

    @Patch('/:id')
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiImplicitBody({ name: "body", required: true, type: CreateDepartmentDto })
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'The record does not exist.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async updateDepartment(@Param() param, @Response() res, @Body() body) {

        const department = await this.departmentService.update(param.id, body);

        if (department) {
            return res.status(HttpStatus.OK).json(department);
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: 'department doesn\'t exist!' });
    }

}
