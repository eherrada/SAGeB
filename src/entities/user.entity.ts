import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username:string;

    @Column()
    password: string;
    
    @ManyToOne(type => Role, role => role.id)
    role: number;

    @Column({unique: true})
    cuit: string;
}
