import { Controller, Get, Post } from '@nestjs/common';

@Controller('/fox')
export class FoxController {
  @Get('/')
  getItem(): string {
    return 'my item';
  }

  @Post('/')
  postItem(): string {
    return 'Ok!';
  }
}
