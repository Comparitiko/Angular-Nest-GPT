import * as fs from 'fs/promises';
import OpenAI from 'openai';
import * as path from 'path';
import { VOICES } from '../enums/voices.enum';
import { TextToAudioOptions } from '../interfaces/text-to-audio-options.interface';

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: TextToAudioOptions,
) => {
  let selectedVoice: VOICES;

  if (!voice) {
    selectedVoice = VOICES.NOVA;
  } else {
    selectedVoice = VOICES[voice.toUpperCase()];
  }

  const folderPath = path.resolve(__dirname, '../../../generated/audios/');

  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  await fs.mkdir(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });

  console.log(mp3);

  // Crear buffer con la respuesta
  const buffer = Buffer.from(await mp3.arrayBuffer());

  await fs.writeFile(speechFile, buffer);

  return speechFile;
};
