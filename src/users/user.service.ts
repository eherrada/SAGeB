import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/users/user.repository";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async getUserById(id:string): Promise<User> {       
        const found = await this.userRepository.findOne(id);
        if (!found){
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
}