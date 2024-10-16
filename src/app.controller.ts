import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


// import { Controller, Get, Query, Post, Body, Put, Param, Delete, Bind } from '@nestjs/common';

// @Controller('cats')
// export class CatsController {
//   @Post()
//   @Bind(Body())
//   create(createCatDto) {
//     return 'This action adds a new cat';
//   }

//   @Get()
//   @Bind(Query())
//   findAll(query) {
//     console.log(query);
//     return `This action returns all cats (limit: ${query.limit} items)`;
//   }

//   @Get(':id')
//   @Bind(Param('id'))
//   findOne(id) {
//     return `This action returns a #${id} cat`;
//   }

//   @Put(':id')
//   @Bind(Param('id'), Body())
//   update(id, updateCatDto) {
//     return `This action updates a #${id} cat`;
//   }

//   @Delete(':id')
//   @Bind(Param('id'))
//   remove(id) {
//     return `This action removes a #${id} cat`;
//   }
// }