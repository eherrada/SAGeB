import { EntityRepository, Repository } from "typeorm";
import { CreateReimbursementDto } from "./DTO/create-reimbursement.dto";
import { ReimbursementStatus } from "./reimbursement-status.enum";
import { Reimbursement } from './reimbursement.entity';

@EntityRepository(Reimbursement)
export class ReimbursementRepository extends Repository<Reimbursement>{

    async createReimbursement(createReimbursementDto: CreateReimbursementDto, filePath): Promise<Reimbursement>{

        const {title, description} = createReimbursementDto;
        const reimbursement = new Reimbursement();
        reimbursement.title = title;
        reimbursement.description = description;
        reimbursement.filePath = filePath;
        reimbursement.status = ReimbursementStatus.OPEN;
        await reimbursement.save();
        
        return reimbursement;
    }

    
}
