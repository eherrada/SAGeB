import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ReimbursementsModule } from './reimbursements/reimbursement.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ReimbursementsController } from './reimbursements/reimbursement.controller';
import { ReimbursementsService } from './reimbursements/reimbursement.service';
import { ReimbursementRepository } from './reimbursements/reimbursement.repository';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), ReimbursementsModule, AuthModule],
})
export class AppModule {}
