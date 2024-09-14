import { Message } from './message.interfaces';

export interface OrthographyInfo {
  user_Score: number;
  errors: string[];
  message: string;
}

export interface OrthographyMessage extends Message {
  info?: OrthographyInfo;
}
