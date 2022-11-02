
import { Reimbursement } from "../reimbursement.entity";

export class ReimbursementResponseDto {
    
    reimbusment: Reimbursement;
    total: number;
    cuitFound: boolean;
}