import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Establish a native PostgreSQL connection pool using your .env credentials
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);

    // 2. Feed the adapter right into the Prisma 7 client constructor
    super({ adapter });
  }

  async onModuleInit() {
    // 3. Connect to the database automatically when the NestJS application starts
    await this.$connect();
  }

  async onModuleDestroy() {
    // 4. Disconnect Prisma Client and close database connections on shutdown
    await this.$disconnect();
  }
}