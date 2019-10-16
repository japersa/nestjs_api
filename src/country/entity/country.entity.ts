import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Department } from 'src/department/entity/department.entity';
import { Client } from 'src/client/entity/client.entity';

@Entity()
export class Country {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Client, client => client.country)
  clients: Client[];

  @OneToMany(() => Department, department => department.country)
  departments: Department[];


  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}