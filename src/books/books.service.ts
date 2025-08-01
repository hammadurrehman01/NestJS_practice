import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  create(data: CreateBookDto) {
    return this.prisma.books.create({ data });
  }

  // async findAll(genre?: string) {
  //   if (genre) {
  //     const books = await this.prisma.books.findMany({
  //       where: { genre },
  //     });

  //     if (books.length === 0) {
  //       throw new NotFoundException(`No books found for genre: ${genre}`);
  //     }

  //     return books;
  //   }
  //   return this.prisma.books.findMany();
  // }
  async findAll(genre?: string) {
    const books = await this.prisma.books.findMany({
      where: genre ? { genre } : undefined,
      omit: { userId: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            avatar: true,
          },
        },
      },
    });


    if (books.length === 0) {
      throw new NotFoundException(`No books found for genre: ${genre}`)
    }

    return books
  }

  async findByName(name: string) {
    const book = await this.prisma.books.findFirstOrThrow({
      where: { name },
    });

    if (!book) {
      throw new NotFoundException(`Book with the Name ${name} not found`);
    }

    return book;
  }

  update(id: number, data: CreateBookDto) {
    return this.prisma.books.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.books.delete({
      where: { id },
    });
  }
}
