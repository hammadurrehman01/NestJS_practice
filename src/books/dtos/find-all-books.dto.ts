import { IsIn, IsOptional } from 'class-validator';

export class FindAllBooksDto {
  @IsOptional()
  @IsIn(['fiction', 'non-fiction', 'fantasy'], {
    message: 'Genre must be one of: fiction, non-fiction, fantasy',
  })
  genre?: string;
}
