import { PrimaryGeneratedColumn,Column, Entity, OneToMany } from "typeorm";
import { Expense } from "../../expense/expense.entity/expense.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Expense, (expense)=> expense.user)
    expenses: Expense[];
}
