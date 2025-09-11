import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './expense.entity/expense.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense) private expenses: Repository<Expense>,
        @InjectRepository(User) private users: Repository<User>
    ){}

    async list(userId: number){
        const expenses = await this.expenses.find({
            where:{user:{id: userId}},
                order: {date: 'DESC'},
                relations: ['user'],
        });

        return expenses.map(expense => ({
            id: expense.id,
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            user: {id: expense.user.id, email: expense.user.email}

        }))
    }

    async create(userId: number, dto:CreateExpenseDto){
        const user = await this.users.findOne({where:{id:userId}});
        if(!user) throw new NotFoundException('user not found');

        const expense = this.expenses.create({...dto,user});
        const savedExpense = await this.expenses.save(expense);

        return {
            id: savedExpense.id,
            title: savedExpense.title,
            amount: savedExpense.amount,
            category: savedExpense.category,
            date: savedExpense.date,
            user: {id: savedExpense.user.id, email: savedExpense.user.email}
        }
    }

    async update(userId: number, id:number, dto: UpdateExpenseDto){
        const expense = await this.expenses.findOne({where:{id,user:{id:userId}},
        relations: ['user'],});
        if(!expense) throw new NotFoundException('Expense not found');
        Object.assign(expense,dto);
        const updatedExpense = await this.expenses.save(expense);
        
        return {
            id: updatedExpense.id,
            title: updatedExpense.title,
            amount: updatedExpense.amount,
            category: updatedExpense.category,
            date: updatedExpense.date,
            user: {id: updatedExpense.user.id, email: updatedExpense.user.email}
        }
    }

    async remove(userId: number, id:number){
        const expense = await this.expenses.findOne({where:{id, user:{id:userId}}});
        if(!expense) throw new NotFoundException('Expense not found');
        await this.expenses.remove(expense);
        return {deleted: true};
    }
}


