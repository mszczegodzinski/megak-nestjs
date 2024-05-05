import { Module, forwardRef } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [forwardRef(() => ShopModule)],
  exports: [BasketService],
})
export class BasketModule {}
