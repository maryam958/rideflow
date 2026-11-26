import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";


@Entity('drivers')
export class Driver {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    licenseNumber: string;

    @Column({default:false})
    isOnline:boolean;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
