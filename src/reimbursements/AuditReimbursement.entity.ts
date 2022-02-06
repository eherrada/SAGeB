import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reimbursement } from "./reimbursement.entity";

@Entity()
export class AuditReimbursement extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @OneToOne((type) => Reimbursement)
    @JoinColumn({ name: "reimbursementId", referencedColumnName: "id" })
    reimbursementId: Reimbursement;

    @Column()
    description: string;

    @Column()
    date: Date;
    
}