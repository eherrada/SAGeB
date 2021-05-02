import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ReimbursementsModule } from './reimbursements/reimbursement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    ReimbursementsModule
  ],
})
export class AppModule {}
