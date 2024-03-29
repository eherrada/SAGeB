import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../auth/dto/auth-credentials.dto";
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, cuit } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword, cuit});
        try {
            await this.save(user);
          } catch (error) {
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
              } else {
                throw new InternalServerErrorException();
              }
        }
    }
}