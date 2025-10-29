import { ChatManager } from './chat';
import type { Message } from './types';

class App {
  private chatManager: ChatManager;
  private compareManager: ChatManager | null = null;
  private isComparisonMode = false;

  // UI Elements
  private modelSelect: HTMLSelectElement;
  private loadBtn: HTMLButtonElement;
  private compareBtn: HTMLButtonElement;
  private status: HTMLElement;
  private messageInput: HTMLInputElement;
  private sendBtn: HTMLButtonElement;
  private messagesContainer: HTMLElement;
  private chatContainer: HTMLElement;
  private mainPanel: HTMLElement;
  private mainPanelHeader: HTMLElement;

  constructor() {
    // Initialize UI elements
    this.modelSelect = document.getElementById('modelSelect') as HTMLSelectElement;
    this.loadBtn = document.getElementById('loadBtn') as HTMLButtonElement;
    this.compareBtn = document.getElementById('compareBtn') as HTMLButtonElement;
    this.status = document.getElementById('status') as HTMLElement;
    this.messageInput = document.getElementById('messageInput') as HTMLInputElement;
    this.sendBtn = document.getElementById('sendBtn') as HTMLButtonElement;
    this.messagesContainer = document.getElementById('messages') as HTMLElement;
    this.chatContainer = document.getElementById('chatContainer') as HTMLElement;
    this.mainPanel = document.getElementById('mainPanel') as HTMLElement;
    this.mainPanelHeader = document.getElementById('mainPanelHeader') as HTMLElement;

    // Initialize chat manager
    this.chatManager = new ChatManager((status) => {
      this.status.textContent = status;
    });

    this.init();
  }

  private async init() {
    // Check WebGPU support
    if (!navigator.gpu) {
      const userAgent = navigator.userAgent;
      const isHttps = location.protocol === 'https:' || location.hostname === 'localhost';
      const protocol = location.protocol;

      let errorMsg = 'エラー: WebGPU未対応';

      if (!isHttps) {
        errorMsg += ' (HTTPSが必要です)';
      } else if (userAgent.includes('Chrome')) {
        const match = userAgent.match(/Chrome\/(\d+)/);
        const version = match ? parseInt(match[1]) : 0;
        if (version < 113) {
          errorMsg += ` (Chrome ${version} < 113)`;
        } else {
          errorMsg += ' (chrome://flags で WebGPU を有効化してください)';
        }
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        errorMsg += ' (Safari Technology Preview が必要です)';
      }

      this.status.textContent = errorMsg;
      this.status.style.color = '#e74c3c';

      // Show detailed info in panel
      this.mainPanelHeader.textContent = `WebGPU未対応: ${protocol}//${location.host}`;
      return;
    }

    this.status.textContent = 'WebGPU対応を確認しました';
    this.status.style.color = '#2ecc71';

    // Setup event listeners
    this.loadBtn.addEventListener('click', () => this.handleLoadModel());
    this.compareBtn.addEventListener('click', () => this.handleCompareMode());
    this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSendMessage();
      }
    });
  }

  private async handleLoadModel() {
    const modelId = this.modelSelect.value;
    if (!modelId) {
      alert('モデルを選択してください');
      return;
    }

    this.loadBtn.disabled = true;
    this.modelSelect.disabled = true;

    try {
      await this.chatManager.loadModel(modelId, (progress) => {
        this.status.textContent = progress;
      });

      this.messageInput.disabled = false;
      this.sendBtn.disabled = false;
      this.compareBtn.disabled = false;
      this.mainPanelHeader.textContent = this.getModelDisplayName(modelId);
      this.clearMessages();
    } catch (error) {
      console.error('Model load error:', error);
      alert('モデルのロードに失敗しました');
    } finally {
      this.loadBtn.disabled = false;
      this.modelSelect.disabled = false;
    }
  }

  private async handleCompareMode() {
    if (this.isComparisonMode) {
      // Exit comparison mode
      this.exitComparisonMode();
      return;
    }

    const modelId = this.modelSelect.value;
    if (!modelId) {
      alert('モデルを選択してください');
      return;
    }

    // Prompt for second model
    const secondModel = prompt(
      '比較するモデルを選択してください:\n' +
      '1: Phi-3 Mini (4B)\n' +
      '2: Llama 3.2 (1B)\n' +
      '3: Llama 3.2 (3B)\n' +
      '4: Gemma 2 (2B)',
      '1'
    );

    const modelMap: { [key: string]: string } = {
      '1': 'Phi-3-mini-4k-instruct-q4f16_1-MLC',
      '2': 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
      '3': 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
      '4': 'gemma-2-2b-it-q4f16_1-MLC',
    };

    const secondModelId = modelMap[secondModel || '1'];
    if (secondModelId === modelId) {
      alert('異なるモデルを選択してください');
      return;
    }

    this.enterComparisonMode(secondModelId);
  }

  private async enterComparisonMode(secondModelId: string) {
    this.isComparisonMode = true;
    this.compareBtn.textContent = '通常モード';
    this.compareBtn.disabled = true;
    this.messageInput.disabled = true;
    this.sendBtn.disabled = true;

    // Create comparison panel
    const comparePanel = this.createComparisonPanel(secondModelId);
    this.chatContainer.appendChild(comparePanel);
    this.mainPanel.classList.add('comparison');

    // Load second model
    this.compareManager = new ChatManager((status) => {
      const compareStatus = comparePanel.querySelector('.compare-status') as HTMLElement;
      if (compareStatus) {
        compareStatus.textContent = status;
      }
    });

    try {
      await this.compareManager.loadModel(secondModelId);
      this.messageInput.disabled = false;
      this.sendBtn.disabled = false;
      this.compareBtn.disabled = false;
    } catch (error) {
      console.error('Comparison model load error:', error);
      alert('比較モデルのロードに失敗しました');
      this.exitComparisonMode();
    }
  }

  private exitComparisonMode() {
    this.isComparisonMode = false;
    this.compareBtn.textContent = '比較モード';
    this.compareManager = null;

    const comparePanel = document.getElementById('comparePanel');
    if (comparePanel) {
      comparePanel.remove();
    }

    this.mainPanel.classList.remove('comparison');
  }

  private createComparisonPanel(modelId: string): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'chat-panel comparison';
    panel.id = 'comparePanel';
    panel.innerHTML = `
      <div class="panel-header">
        ${this.getModelDisplayName(modelId)}
        <div class="compare-status" style="font-size: 0.8rem; font-weight: normal; margin-top: 0.25rem;"></div>
      </div>
      <div class="messages" id="compareMessages"></div>
      <div class="input-container" style="visibility: hidden; height: 0; padding: 0;"></div>
    `;
    return panel;
  }

  private async handleSendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    this.messageInput.value = '';
    this.messageInput.disabled = true;
    this.sendBtn.disabled = true;

    // Add user message to main panel
    this.addMessage(this.messagesContainer, 'user', message);

    if (this.isComparisonMode && this.compareManager) {
      const compareMessages = document.getElementById('compareMessages') as HTMLElement;
      this.addMessage(compareMessages, 'user', message);

      // Send to both models in parallel
      await Promise.all([
        this.sendToModel(this.chatManager, this.messagesContainer, message),
        this.sendToModel(this.compareManager, compareMessages, message),
      ]);
    } else {
      await this.sendToModel(this.chatManager, this.messagesContainer, message);
    }

    this.messageInput.disabled = false;
    this.sendBtn.disabled = false;
    this.messageInput.focus();
  }

  private async sendToModel(
    manager: ChatManager,
    container: HTMLElement,
    message: string
  ): Promise<void> {
    const messageElement = this.addMessage(container, 'assistant', '');
    const contentElement = messageElement.querySelector('.message-content') as HTMLElement;

    try {
      await manager.chat(message, (chunk) => {
        contentElement.textContent += chunk;
        container.scrollTop = container.scrollHeight;
      });
    } catch (error) {
      contentElement.textContent = 'エラーが発生しました';
      console.error('Chat error:', error);
    }
  }

  private addMessage(container: HTMLElement, role: 'user' | 'assistant', content: string): HTMLElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'U' : 'A';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    container.appendChild(messageDiv);

    container.scrollTop = container.scrollHeight;
    return messageDiv;
  }

  private clearMessages() {
    this.messagesContainer.innerHTML = '';
    const compareMessages = document.getElementById('compareMessages');
    if (compareMessages) {
      compareMessages.innerHTML = '';
    }
  }

  private getModelDisplayName(modelId: string): string {
    const nameMap: { [key: string]: string } = {
      'Phi-3-mini-4k-instruct-q4f16_1-MLC': 'Phi-3 Mini (4B)',
      'Llama-3.2-1B-Instruct-q4f16_1-MLC': 'Llama 3.2 (1B)',
      'Llama-3.2-3B-Instruct-q4f16_1-MLC': 'Llama 3.2 (3B)',
      'gemma-2-2b-it-q4f16_1-MLC': 'Gemma 2 (2B)',
    };
    return nameMap[modelId] || modelId;
  }
}

// Initialize app
new App();
