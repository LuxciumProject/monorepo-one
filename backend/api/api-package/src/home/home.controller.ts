import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('home')
export class HomeController {
  @Get()
  sayHello(@Query() query: any, @Req() req: any) {
    console.log('HomeController created', query, req);
    return 'HomeController created';
  }

  @Post()
  getHello(@Body() body: CreateMessageDto) {
    console.log(body);
    return body;
  }
  // some comment
  @Get('/:id')
  getHelloById(@Param('id') id: string, @Query() query: any) {
    console.log(id, query);
    return id;
  }
}
