import { environment } from '@env/environment';

export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal: AbortSignal,
) {
  try {
    const res = await fetch(
      `${environment.backendApi}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      },
    );

    if (!res.ok) {
      throw new Error('No se pudo corregir la ortografía');
    }

    const reader = res.body?.getReader();

    if (!reader) {
      throw new Error('No se vera el reader');
    }

    const decoder = new TextDecoder();

    let text = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;

      yield text;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
