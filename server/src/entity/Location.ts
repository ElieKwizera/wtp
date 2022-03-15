import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export  class Location extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string

    @Column()
    district : string

    @Column({
        nullable: true
    })
    sector: string

    @Column({
        default : new  Date()
    })
    createAt : Date

    static async saveLocation(name: string, district: string , sector : string )
    {
        return await this.createQueryBuilder()
            .insert()
            .into(Location)
            .values({name,district,sector})
            .execute();
    }
}