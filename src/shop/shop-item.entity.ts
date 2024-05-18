import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';

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

  @OneToOne(() => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  /* Subproduct */
  @ManyToOne(
    () => ShopItem,
    entity => entity.subShopItems,
  )
  mainShopItem: ShopItem;

  /* Main product */
  @OneToMany(
    () => ShopItem,
    entity => entity.mainShopItem,
  )
  subShopItems: ShopItem[];
}
