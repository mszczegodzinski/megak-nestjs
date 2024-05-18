import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShopItem extends BaseEntity implements ShopItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    default: '',
  })
  name: string;

  @Column({
    type: 'longtext',
    default: '(brak)',
  })
  description: string | null;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ default: 0 })
  boughtCounter: number;

  @Column({ default: false })
  wasEverBought: boolean;
}
