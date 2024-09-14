import { TranslateMessage } from '@app/interfaces/translate-message.interface';
import { TranslateResponse } from '@app/interfaces/translate.response';
import { environment } from '@env/environment';

export const translateUseCase = async (
  prompt: string,
  lang: string,
): Promise<TranslateMessage> => {
  try {
    const res = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!res.ok) {
      throw new Error('No se pudo corregir la ortografía');
    }

    const data = (await res.json()) as TranslateResponse;

    return {
      isGpt: true,
      text: data.message,
    };
  } catch (error) {
    console.error(error);
    return {
      isGpt: true,
      text: 'Surgio un error al intentar comparar. Intentalo de nuevo.',
    };
  }
};
