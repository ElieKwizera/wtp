import {Entity, PrimaryGeneratedColumn, Column, BaseEntity , ManyToOne} from "typeorm";
import { Route } from "./Route";

@Entity('trip')
export class Trip extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Route, route => route.trip)
    route: Route;

    @Column({
        default: new Date()
    })
    departure_time: Date;


    @Column({
        default: new Date()
    })
    arrival_time: Date;


    @Column({
        default: new Date()
    })
    createdAt : Date


}