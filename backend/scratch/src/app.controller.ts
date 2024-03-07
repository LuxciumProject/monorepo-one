import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {

  @Get()
  getRootRoute() {
    return 'NestJS: The Complete Developer\'s Guide';;

  }
}
