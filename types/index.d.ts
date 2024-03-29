export type City = {
  ko: string;
  en: string;
  img: string;
  language: string;
};

export type Language = {
  ko: string;
  en: string;
};

export type Situation = {
  ko: string;
  en: string;
  img: string;
};

export type SelectedData = {
  language: string;
  language_code: string;
  voice_name: string;
  situation: string;
};

export type TextToSpeech = {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  text: string;
};

export type InitGPT = {
  lang: string;
  type: string;
  suggested: boolean;
};

export type Message = {
  role: string;
  content: string;
};
