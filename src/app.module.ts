import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
