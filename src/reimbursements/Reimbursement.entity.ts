import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ReimbursementStatus } from "./reimbursement-status.enum";

@Entity()
export class Reimbursement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: ReimbursementStatus;
}
 