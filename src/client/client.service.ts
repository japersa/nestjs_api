import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly repository: Repository<Client>) {
    }

    async findAll(): Promise<Client[]> {
        return await this.repository.find();
    }

    async findById(ID: number): Promise<Client> {
        return await this.repository.findOne(ID);
    }

    async create(createClientDto: CreateClientDto): Promise<Client> {
        return await this.repository.save(createClientDto);
    }

    async update(ID: number, newValue: CreateClientDto): Promise<Client | null> {
        let client = await this.repository.findOne(ID);
        client.full_name = newValue.full_name;
        client.nit = newValue.nit;
        client.address = newValue.address;
        client.phone = newValue.phone;
        client.credit_limit = newValue.credit_limit;
        client.available_credit = newValue.available_credit;
        client.city = newValue.city;
        client.department = newValue.department;
        client.country = newValue.country;


        return await this.repository.save(client);
    }
    
}
