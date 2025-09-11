import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JWTAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
@UseGuards(JWTAuthGuard)
export class ExpenseController {
    constructor(private readonly expenseService:ExpenseService){}

    @Get()
    list(@Req() req){
        return this.expenseService.list(req.user.userId);
    }

    @Post()
    create(@Req() req, @Body() dto:CreateExpenseDto){
        return this.expenseService.create(req.user.userId,dto);
    }

    @Patch(':id')
    update(@Req() req, @Param('id') id:number, @Body() dto:UpdateExpenseDto){
        return this.expenseService.update(req.user.userId,id, dto);
    }

    @Delete(':id')
    remove(@Req() req, @Param('id') id:number){
        return this.expenseService.remove(req.user.userId,id);
    }
}
