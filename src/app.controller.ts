import { Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/practice')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/withstatuscode')
  @HttpCode(207)
  withStatusCode() {
    return 'Return the status code';
  }

  @Post('/withheaders')
  @Header('Cache-Control', 'cache')
  withHeaders() {
    return 'No store cache in the headers';
  }
}
