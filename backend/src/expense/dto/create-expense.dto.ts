import { IsDateString, IsNumber, IsString, MinLength } from "class-validator";

export class CreateExpenseDto {
    @IsString()
        @MinLength(1, { message: 'Title is required' })
    title: string;

    @IsNumber()
    amount: number;

    @IsString()
    @MinLength(1, { message: 'Category is required' })
    category: string;

    @IsDateString()
    date: string;
}