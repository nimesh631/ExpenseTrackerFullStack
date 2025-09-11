import { Entity , PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "src/auth/user.entity/user.entity";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('decimal')
    amount: number;

    @Column()
    category: string;

    @Column({type: 'date'})
    date:string;

    @ManyToOne(()=>User,(user)=>user.expenses,{onDelete: 'CASCADE'})
    user: User;

    
}
