import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BooksModule, UsersModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, PrismaService],
})
export class AppModule {}
