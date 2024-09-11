import OpenAI from 'openai';
import { Options } from '../interfaces/options.interface';

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
					Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
					la respuesta debe de ser en formato markdown,
					los pros y contras deben de estar en una lista,
				`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1000,
  });

  return response.choices[0].message;
};