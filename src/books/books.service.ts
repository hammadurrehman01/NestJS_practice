import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateBookDto) {
        return this.prisma.books.create({ data })
    }

    findAll(genre?: string) {
        if (genre) {
            return this.prisma.books.findMany({
                where: { genre }
            })
        }
        return this.prisma.books.findMany()
    }

    findById(id: number) {
        return this.prisma.books.findUnique({
            where: { id }
        })
    }

    update(id: number, data: CreateBookDto) {
        return this.prisma.books.update({
            where: { id },
            data
        })
    }

    delete(id: number) {
        return this.prisma.books.delete({
            where: { id }
        })
    }


}
