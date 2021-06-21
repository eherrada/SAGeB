import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { ReimbursementRepository } from './reimbursement.repository';
import { ReimbursementsController } from './reimbursement.controller';
import { ReimbursementsService } from './reimbursement.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReimbursementRepository]),
    AuthModule,
  ],
  controllers: [ReimbursementsController],
  providers: [ReimbursementsService],
})
export class ReimbursementsModule { }

