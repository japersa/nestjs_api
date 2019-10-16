import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Department } from 'src/department/entity/department.entity';
import { Country } from 'src/country/entity/country.entity';
import { City } from 'src/city/entity/city.entity';

@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;
  
  @Column()
  nit: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  credit_limit: number;

  @Column()
  available_credit: number;

  @ManyToOne(() => City, city => city.clients)
  city: City;

  @ManyToOne(() => Department, department => department.clients)
  department: Department;

  @ManyToOne(() => Country, country => country.clients)
  country: Country;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}