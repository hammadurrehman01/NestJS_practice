import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  @Get()
  findAll(@Req() request: Request, @Query('genre') genre: string) {
    if(genre) {
      return `${genre} Books: `;
    }
    return `All Books: `;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `We have ${id} books`;
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return createBookDto;
  }
}
