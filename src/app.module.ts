import { Module } from '@nestjs/common';
import { ReimbursementModule } from './reimbursement/reimbursement.module';

@Module({
  imports: [ReimbursementModule],
})
export class AppModule {}
