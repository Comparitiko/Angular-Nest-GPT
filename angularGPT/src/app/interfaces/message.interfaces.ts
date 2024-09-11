export interface Info {
  user_Score: number;
  errors: string[];
  message: string;
}

export interface Message {
  text: string;
  isGpt: boolean;
  info?: Info;
}
