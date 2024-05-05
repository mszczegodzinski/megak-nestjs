import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
  imports: [forwardRef(() => BasketModule)],
})
export class ShopModule {}
