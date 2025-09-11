import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity/expense.entity';
import { User } from 'src/auth/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense,User])],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
