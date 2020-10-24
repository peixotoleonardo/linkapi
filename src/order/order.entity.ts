import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity('orders')
export class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  client: string;

  @Column({ name: 'id_transaction' })
  idTransaction: number;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  currency: string;

  @Column('enum', { enum: OrderStatus})
  status: OrderStatus;

  @CreateDateColumn()
  date: Date;
}
