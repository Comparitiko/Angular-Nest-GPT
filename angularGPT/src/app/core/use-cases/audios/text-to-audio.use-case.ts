import { environment } from '@env/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const res = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!res.ok) {
      throw new Error('No se pudo generar el audio');
    }

    const audioFile = await res.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo generar el audio',
      audioUrl: '',
    };
  }
};
