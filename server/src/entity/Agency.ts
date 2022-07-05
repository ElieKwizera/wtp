import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { AgencyAdmin } from './AgencyAdmin';
import { Route } from './Route';
import { User } from './User';

@Entity()
export class Agency extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200, nullable: false} )
    name: String;

    @OneToMany(() => AgencyAdmin, agencyAdmin => agencyAdmin.agency)
    agencyAdmins : AgencyAdmin[];

    @ManyToOne(() => User, user => user.agencies)
    createdBy: User;

    @ManyToMany( () => Route, route => route.agency)
    route: Route[];

}