import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { ReimbursementRepository } from './reimbursement.repository';
import { ReimbursementsController } from './reimbursement.controller';
import { ReimbursementsService } from './reimbursement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReimbursementRepository])
  ], 
  controllers: [ReimbursementsController],
  providers: [ReimbursementsService],
})
export class ReimbursementsModule {}

