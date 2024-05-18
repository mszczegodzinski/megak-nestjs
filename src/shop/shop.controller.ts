import {
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  GetPaginatedListOfProductsResponse,
} from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
})
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/:page')
  getListOfProducts(
    @Param('page') page: string,
  ): Promise<GetPaginatedListOfProductsResponse> {
    return this.shopService.getProducts(Number(page));
  }

  @Get('/find')
  testFindItem(): Promise<GetListOfProductsResponse> {
    return this.shopService.findProducts();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string): Promise<void> {
    return this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
