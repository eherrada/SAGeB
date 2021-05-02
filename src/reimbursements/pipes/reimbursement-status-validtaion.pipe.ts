import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ReimbursementStatus } from "../reimbursement-status.enum";

export class ReimbursementStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        ReimbursementStatus.DONE,
        ReimbursementStatus.IN_PROGRESS,
        ReimbursementStatus.OPEN
    ];

    transform(value: any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;

    }
}