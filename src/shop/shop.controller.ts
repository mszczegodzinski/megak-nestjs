import {
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  Redirect,
} from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  host: ':name.lvh.me',
})
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }

  // @Get('/test/:age')
  // @Redirect()
  // testRedirect(@Param('age') age: string) {
  //   const url = Number(age) > 18 ? '/site' : '/block';
  //   return {
  //     url,
  //     statusCode: 302,
  //   };
  // }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string): string {
    return `Witaj w sklepie ${siteName}`;
  }
}
