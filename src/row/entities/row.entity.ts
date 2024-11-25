import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Row {

  @ApiProperty({ description: 'Unique id of row' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Timestamp of operation in google table' })
  @Column({type: 'timestamp with time zone'})
  timestamp: string;

  @ApiProperty({ description: 'Id of order' })
  @Column({type: 'int'})
  orderId: number;

  @ApiProperty({ description: 'Consumer first and last name' })
  @Column()
  customer: string;
    
  @ApiProperty({ description: 'Date of order' })
  @Column({type: 'date'})
  orderDate: string;
   
  @ApiProperty({ description: 'Status of order' })
  @Column({type: 'varchar'})
  status: string;
}