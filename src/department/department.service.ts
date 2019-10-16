import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entity/department.entity';
import { CreateDepartmentDto } from './dto/createDepartment.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly repository: Repository<Department>) {
    }

    async findAll(): Promise<Department[]> {
        return await this.repository.find();
    }

    async findByFilterCountry(ID: number): Promise<Department[]> {
        return await this.repository.find({ where: {
            country: ID
        }, relations: ["country"] });
    }

    async findById(ID: number): Promise<Department> {
        return await this.repository.findOne(ID);
    }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        return await this.repository.save(createDepartmentDto);
    }

    async update(ID: number,newValue: CreateDepartmentDto): Promise<Department | null> {
        let department = await this.repository.findOne(ID);
        department.name = newValue.name;
        department.country = newValue.country;
        return await this.repository.save(department);
    }
    
}
