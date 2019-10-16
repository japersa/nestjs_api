import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Country } from 'src/country/entity/country.entity';
import { City } from 'src/city/entity/city.entity';
import { Client } from 'src/client/entity/client.entity';

@Entity()
export class Department {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => Country, country => country.departments)
  country: Country;

  @OneToMany(() => City, city => city.department)
  cities: City[];

  @OneToMany(() => Client, client => client.department)
  clients: Client[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}