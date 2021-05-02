import { ReimbursementStatus } from "../reimbursement-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetReimbursementsFilterDto{
    @IsOptional()
    @IsIn([ReimbursementStatus.OPEN, ReimbursementStatus.IN_PROGRESS, ReimbursementStatus.DONE])
    status: ReimbursementStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}