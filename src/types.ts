export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatPanel {
  id: string;
  modelId: string;
  messages: Message[];
  element: HTMLElement;
}
