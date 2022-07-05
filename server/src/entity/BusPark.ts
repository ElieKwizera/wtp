import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Route } from "./Route";


@Entity('buspark')
export class BusPark extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable: false})
    name: String;

    @Column()
    district: String;

    @Column()
    sector: String;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    static async saveBusPark(name: string, district: string , sector : string, longitude: number, latitude: number)
    {
        return await this.createQueryBuilder()
            .insert()
            .into(BusPark)
            .values({name,district,sector, longitude, latitude})
            .execute();
    }

}