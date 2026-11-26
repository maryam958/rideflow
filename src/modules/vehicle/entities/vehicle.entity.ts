import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Driver } from "../../driver/entities/driver.entity";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ unique: true })
    plateNumber: string;

    @Column()
    model: string;

    @Column()
    color: string;


    @ManyToOne(()=>Driver)
    driver: Driver;


}
