import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';
import { CreateCountryDto } from './dto/createCountry.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private readonly repository: Repository<Country>) {
    }

    async findAll(): Promise<Country[]> {
        return await this.repository.find();
    }

    async findById(ID: number): Promise<Country> {
        return await this.repository.findOne(ID);
    }

    async create(createCountryDto: CreateCountryDto): Promise<Country> {
        return await this.repository.save(createCountryDto);
    }

    async update(ID: number,newValue: CreateCountryDto): Promise<Country | null> {
        let country = await this.repository.findOne(ID);
        country.name = newValue.name;
        return await this.repository.save(country);
    }
    
}
