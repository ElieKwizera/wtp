import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Agency } from "./Agency";
import { BusPark } from "./BusPark";
import { Trip } from "./Trip";

@Entity('route')
export class Route extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Agency, agency => agency.route)
    agency : Agency[];

    @ManyToMany(() => BusPark, buspark => buspark.id)
    departure: BusPark[];

    @ManyToMany(() => BusPark, buspark => buspark.id)
    destination: BusPark[];

    @Column()
    price : number;

    @OneToMany(() => Trip, trip => trip.route)
    trip: Trip[];

}