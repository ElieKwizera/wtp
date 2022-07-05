import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, OneToMany, ManyToOne} from "typeorm";
import {Roles} from "./Roles";
import bcrypt from 'bcrypt';
import { Agency } from "./Agency";

@Entity("agencyadmin")
export class AgencyAdmin extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.Passenger
    })
    role: Roles;

    @ManyToOne( () => Agency, agency => agency.agencyAdmins)
    agency: Agency


    @Column({
        default: new Date()
    })
    createdAt : Date

    @Column({
        default : false
    })
    verified : Boolean



 

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
