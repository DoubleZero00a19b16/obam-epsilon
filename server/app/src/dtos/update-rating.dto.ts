// dtos/update-rating.dto.ts
import { IsInt, IsString, IsOptional, Min, Max, Length } from 'class-validator';

export class UpdateRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  score?: number;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  comment?: string;
}