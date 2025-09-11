import { IsDateString, IsNumber, isString, IsString } from "class-validator";

export class CreateExpenseDto {
    @IsString()
    title: string;

    @IsNumber()
    amount: number;

    @IsString()
    category: string;

    @IsDateString()
    date: string;
}