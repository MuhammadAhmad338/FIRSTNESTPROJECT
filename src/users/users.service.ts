import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, SigninUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }
    return await this.prisma.user.create({ data: createUserDto });
  }

  async signin(signinUserDto: SigninUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signinUserDto.email },
    });
    if (!existingUser) {
      throw new ConflictException('Email is not registered');
    }
    return await this.prisma.user.findUnique({ where: { email: signinUserDto.email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
