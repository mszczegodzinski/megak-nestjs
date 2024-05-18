import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { count, name, id } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      count < 1 ||
      !name.length ||
      !this.shopService.hasProduct(name)
    ) {
      return { isSuccess: false };
    }

    this.items.push(item);

    this.shopService.addBoughtCounter(id);

    return { isSuccess: true, index: this.items.length - 1 };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;
    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    }

    items.splice(index, 1);

    return { isSuccess: true };
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    if (!this.items.every(item => this.shopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter(item =>
        this.shopService.hasProduct(item.name),
      );
      return { isSuccess: false, alternativeBasket };
    }

    return (
      await Promise.all(
        this.items.map(
          async item =>
            (await this.shopService.getPriceOfProduct(item.name)) *
            item.count *
            1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  async countPromo(): Promise<number> {
    const totalPrice = this.getTotalPrice();
    if (typeof totalPrice === 'number') {
      return totalPrice > 10 ? 1 : 0;
    }
  }
}
