import * as webllm from '@mlc-ai/web-llm';
import type { Message } from './types';

export class ChatManager {
  private engine: webllm.MLCEngine | null = null;
  private currentModel: string = '';
  private messages: Message[] = [];
  private onStatusChange: (status: string) => void;

  constructor(onStatusChange: (status: string) => void) {
    this.onStatusChange = onStatusChange;
  }

  async loadModel(modelId: string, onProgress?: (progress: string) => void): Promise<void> {
    this.onStatusChange('モデルをロード中...');

    try {
      // 既存のエンジンがあればリセット
      if (this.engine) {
        await this.engine.unload();
      }

      // 新しいエンジンを作成
      this.engine = await webllm.CreateMLCEngine(modelId, {
        initProgressCallback: (progress) => {
          const percent = Math.round(progress.progress * 100);
          const msg = `${progress.text} (${percent}%)`;
          this.onStatusChange(msg);
          onProgress?.(msg);
        },
      });

      this.currentModel = modelId;
      this.messages = [];
      this.onStatusChange(`${modelId} 準備完了`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '不明なエラー';
      this.onStatusChange(`エラー: ${errorMsg}`);
      throw error;
    }
  }

  async chat(userMessage: string, onStream?: (chunk: string) => void): Promise<string> {
    if (!this.engine) {
      throw new Error('モデルがロードされていません');
    }

    this.messages.push({ role: 'user', content: userMessage });

    let fullResponse = '';

    const completion = await this.engine.chat.completions.create({
      messages: this.messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 512,
    });

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
      onStream?.(content);
    }

    this.messages.push({ role: 'assistant', content: fullResponse });
    return fullResponse;
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  getCurrentModel(): string {
    return this.currentModel;
  }

  isReady(): boolean {
    return this.engine !== null;
  }

  async reset(): Promise<void> {
    this.messages = [];
    if (this.engine) {
      await this.engine.resetChat();
    }
  }
}
