import { IsString, MinLength } from 'class-validator';

export class TranslateDto {
  @IsString()
  @MinLength(1)
  prompt: string;

  @IsString()
  @MinLength(1)
  lang: string;
}
