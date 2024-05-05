import { Controller, Get } from '@nestjs/common';
import { UserData } from 'src/types/user-data';
import { sleep } from 'src/utils/sleep';

@Controller('fox')
export class FoxController {
  @Get()
  async myFirstAction(): Promise<UserData> {
    return {
      name: 'John',
      surname: 'Doe',
      age: 25,
    };
  }
}
