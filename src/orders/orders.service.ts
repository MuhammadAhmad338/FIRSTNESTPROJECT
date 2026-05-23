import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }
  
   create(createOrderDto: CreateOrderDto, userId: string) {
    return this.prisma.orders.create({
      data: {
        productId: createOrderDto.productId,
        quantity: createOrderDto.quantity,
        userId: userId,
        total_amount: 0, // TODO: Calculate total amount
      },
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
