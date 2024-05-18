import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import {
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
} from 'src/interfaces/shop';
import { LessThan, Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(
    currentPage = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(count / maxPerPage);

    // console.log('count', { count, totalPages });
    return { items, totalPages };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some(item => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (
      (await this.getProducts()).items.find(item => item.name === name)
        ?.price || 0
    );
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return this.shopItemRepository.findOne(id);
  }

  async removeProduct(id: string): Promise<void> {
    await this.shopItemRepository.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = 'product1';
    newItem.price = 100.0;
    newItem.description = 'This is a dummy product 1';

    await this.shopItemRepository.save(newItem);
    return newItem;
  }

  async addBoughtCounter(id: string): Promise<void> {
    await this.shopItemRepository.update(id, { wasEverBought: true });
    const item = await this.shopItemRepository.findOneOrFail(id);
    item.boughtCounter++;

    await this.shopItemRepository.save(item);
  }

  async findProducts(): Promise<GetListOfProductsResponse> {
    return await ShopItem.find({
      where: { price: LessThan(100) },
    });
  }
}
