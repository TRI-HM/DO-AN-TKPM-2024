export interface Message {
  sender: string;
  content: string;
}

export interface ChatProps {}

export interface TextToSpeechProps {
  formText: string; // Text to be converted to speech
}
