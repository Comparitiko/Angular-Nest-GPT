import { Message } from './message.interfaces';

export interface TextToAudioMessage extends Message {
  audioUrl?: string;
}
