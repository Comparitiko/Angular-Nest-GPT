import { ProsConsResponse } from '@app/interfaces/pros-cons.response';
import { environment } from '@env/environment';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const res = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error('No se pudo corregir la ortografía');
    }

    const data = (await res.json()) as ProsConsResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      role: 'gpt',
      content: 'Surgio un error al intentar comparar. Intentalo de nuevo.',
    };
  }
};
