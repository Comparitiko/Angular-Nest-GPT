import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@app/core/use-cases/orthography/orthography.use-case';
import { prosConsStreamUseCase } from '@app/core/use-cases/pros-cons/pros-cons-stream.use-case';
import { prosConsUseCase } from '@app/core/use-cases/pros-cons/pros-cons.use-case';
import { translateUseCase } from '@app/core/use-cases/translate/translate.use-case';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translateText(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }
}
