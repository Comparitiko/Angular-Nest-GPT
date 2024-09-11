import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
					Se te mandara un mensaje de texto que puede contener errores ortográficos,

					Tus respuestas deben de ser en formato JSON.

					Tambien debes de poner un porcentaje de acierto del usuario en la respuesta.

					Si no hay errores ortográficos, debes de poner un mensaje de texto dando la enhorabuena de que no hay errores ortográficos.

					Las respuestas tienen que tener este formato:
					{
						user_Score: number,
						errors: string[], // ['error1 -> solucion1', 'error2 -> solucion2', error3 -> solucion3']
						message: string, // Usa emojis y texto para dar la enhorabuena al usuario
					}
				`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: {
      type: 'json_object',
    },
    temperature: 0.3,
    max_tokens: 150,
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);

  return jsonResponse;
};
