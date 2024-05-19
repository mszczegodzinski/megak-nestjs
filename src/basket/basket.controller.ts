import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import {
  AddToBasketResponse,
  GetTotalBasketPriceResponse,
  GetBasketResponse,
  RemoveFromBasketResponse,
  GetBasketStatsResponse,
} from 'src/interfaces/basket';
import { AddItemDto } from './dto/add-item.dto';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}
  @Post('/')
  addProductToBasket(@Body() item: AddItemDto): Promise<AddToBasketResponse> {
    return this.basketService.add(item);
  }

  @Delete('/all')
  clearBasket(): void {
    this.basketService.clearBasket();
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: string,
  ): Promise<RemoveFromBasketResponse> {
    return this.basketService.remove(index);
  }

  @Get('/')
  listProductsInBasket(): Promise<GetBasketResponse> {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
