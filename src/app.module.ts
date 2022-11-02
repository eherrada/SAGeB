import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ReimbursementsModule } from './reimbursements/reimbursement.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), ReimbursementsModule, AuthModule, UserModule],
})
export class AppModule {}
