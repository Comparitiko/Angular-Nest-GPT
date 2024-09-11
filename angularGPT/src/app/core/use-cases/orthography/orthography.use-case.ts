import { type OrthographyResponse } from '@app/interfaces/orthography.response';
import { environment } from '@env/environment';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const res = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error('No se pudo corregir la ortografía');
    }

    const data = (await res.json()) as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      user_Score: 0,
      errors: [],
      message: 'No se pudo corregir la ortografía',
    };
  }
};
