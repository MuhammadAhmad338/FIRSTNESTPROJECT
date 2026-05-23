import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ProductsModule, PrismaModule, UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
