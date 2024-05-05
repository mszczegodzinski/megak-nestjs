import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  getProducts(): GetListOfProductsResponse {
    return [
      { name: 'Ogórki kiszone', description: 'Bardzo dobre ogórki', price: 4 },
      {
        name: 'Super ogórki',
        description: 'Jeszcze lepsze ogórki',
        price: 6 - this.basketService.countPromo(),
      },
      {
        name: 'Ogórki afrykańskie',
        description: 'Ogórki z dalekich krain',
        price: 5 - this.basketService.countPromo(),
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some(item => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find(item => item.name === name)?.price || 0;
  }
}
