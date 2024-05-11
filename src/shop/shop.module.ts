import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from 'src/basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
  imports: [
    TypeOrmModule.forFeature([ShopItem]),
    forwardRef(() => BasketModule),
  ],
})
export class ShopModule {}
