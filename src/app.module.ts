import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BasketModule, ShopModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
