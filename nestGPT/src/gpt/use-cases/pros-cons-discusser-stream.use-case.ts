import OpenAI from 'openai';
import { Options } from '../interfaces/options.interface';

export const prosConsDicusserStreamUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
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
};
