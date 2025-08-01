import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [BooksModule, UsersModule],
  controllers: [AppController, BooksController, UsersController],
  providers: [AppService, BooksService,  UsersService, PrismaService],
})
export class AppModule {}
