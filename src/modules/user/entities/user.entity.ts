import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn} from 'typeorm';

export enum UserRole {
  RIDER = 'rider',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.RIDER })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;
}