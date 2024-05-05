import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { FoxService } from './fox.service';
import { CreateFoxDto } from './dto/create-fox.dto';

@Controller('/fox')
export class FoxController {
  constructor(@Inject(FoxService) private foxService: FoxService) {}

  @Post('/')
  createFox(@Body() newFox: CreateFoxDto): string {
    return this.foxService.createFox(newFox);
  }
}
