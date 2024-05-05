import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      { name: 'Ogórki kiszone', description: 'Bardzo dobre ogórki', price: 4 },
      { name: 'Super ogórki', description: 'Jeszcze lepsze ogórki', price: 6 },
      {
        name: 'Ogórki afrykańskie',
        description: 'Ogórki z dalekich krain',
        price: 5,
      },
    ];
  }
}
