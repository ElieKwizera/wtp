import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findByEmail (email : string) : Promise<User>
    {
        return await this.findOne({email});
    }

    async createUser(username, email, password) : Promise<User>
    {
        const user  = new User();
        user.email = email;
        user.username =  username;
        user.password = password;

        return await user.save();


    }
}