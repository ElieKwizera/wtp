import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {Roles} from "./Roles";

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.Passenger
    })
    role: Roles;

    @Column({
        default: new Date()
    })
    createdAt : Date
}
