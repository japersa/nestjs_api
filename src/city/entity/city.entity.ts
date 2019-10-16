import { Entity, OneToMany, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Department } from 'src/department/entity/department.entity';
import { Client } from 'src/client/entity/client.entity';

@Entity()
export class City {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(() => Department, department => department.cities)
  department: Department;

  @OneToMany(() => Client, client => client.city)
  clients: Client[];
  
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}