import { Injectable } from '@nestjs/common';
import { CreateFoxDto } from './dto/create-fox.dto';

@Injectable()
export class FoxService {
  createFox(newFox: CreateFoxDto) {
    console.log(newFox);
    return `New fox created: ${newFox.name}`;
  }
}
