import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { ShopItem } from 'src/shop/shop-item.entity';

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @OneToOne(
    type => ShopItem,
    entity => entity.itemInBasket,
  )
  @JoinColumn()
  shopItem: ShopItem;
}
