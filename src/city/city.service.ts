import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entity/city.entity';
import { CreateCityDto } from './dto/createCity.dto';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City)
        private readonly repository: Repository<City>) {
    }

    async findAll(): Promise<City[]> {
        return await this.repository.find();
    }

    async findByFilterDepartment(ID: number): Promise<City[]> {
        return await this.repository.find({ where: {
            department: ID
        }, relations: ["department"] });
    }

    async findById(ID: number): Promise<City> {
        return await this.repository.findOne(ID);
    }

    async create(createCityDto: CreateCityDto): Promise<City> {
        return await this.repository.save(createCityDto);
    }

    async update(ID: number,newValue: CreateCityDto): Promise<City | null> {
        let city = await this.repository.findOne(ID);
        city.name = newValue.name;
        city.department = newValue.department;
        return await this.repository.save(city);
    }
    
}
