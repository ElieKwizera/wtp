import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert} from "typeorm";
import {Roles} from "./Roles";
import bcrypt from 'bcrypt';

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

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

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}
