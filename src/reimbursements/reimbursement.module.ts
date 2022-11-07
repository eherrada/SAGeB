import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReimbursementRepository } from './reimbursement.repository';
import { ReimbursementsController } from './reimbursement.controller';
import { ReimbursementsService } from './reimbursement.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReimbursementRepository]),
    AuthModule, UserModule
  ],
  controllers: [ReimbursementsController],
  providers: [ReimbursementsService]
})
export class ReimbursementsModule {}

