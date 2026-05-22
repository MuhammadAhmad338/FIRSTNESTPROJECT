import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  helloAhmad(): string {
    return 'Hello From Ahmad!';
  }
}
