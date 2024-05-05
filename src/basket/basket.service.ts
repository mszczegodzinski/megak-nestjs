import { Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { AddProductToBasketResponse } from 'src/interfaces/basket';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  add(item: AddProductDto): AddProductToBasketResponse {
    if (
      typeof item.name !== 'string' ||
      typeof item.count !== 'number' ||
      item.count < 1 ||
      !item.name.length
    ) {
      return { isSuccess: false };
    }

    this.items.push(item);

    console.log('Basket items:', this.items);

    return { isSuccess: true, index: this.items.length - 1 };
  }
}
