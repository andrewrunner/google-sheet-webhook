import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotifyEmail {

  @ApiProperty({ description: 'Unique id of row' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Email address for notifications' })
  @Column({type: 'varchar'})
  email: string;
}