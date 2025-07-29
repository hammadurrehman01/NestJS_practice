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
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const createdBook = await this.booksService.create(createBookDto);
    return {
      message: 'Book created successfully',
      data: createdBook,
    };
  }

  @Get()
  async findAll(@Query('genre') genre?: string) {
    const books = await this.booksService.findAll(genre);
    return {
      message: 'Books retrieved successfully',
      data: books,
    };
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const book = await this.booksService.findByName(name);
    return {
      message: 'Book retrieved successfully',
      data: book,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookDto: CreateBookDto,
  ) {
    return this.booksService.update(id, createBookDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
