import OpenAI from 'openai';
import { TranslateOptions } from '../interfaces/translate-options.interface';

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: TranslateOptions,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
  });

  return {
    message: response.choices[0].message.content,
  };
};
