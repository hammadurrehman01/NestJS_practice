import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto)
  }

  @Get()
  findAll(@Query('genre') genre?: string) {
    return this.booksService.findAll(genre)
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findById(id)
  }

  @Put(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() createBookDto: CreateBookDto) {
    return this.booksService.update
  }

  @Delete(":id")
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete
  }


}
