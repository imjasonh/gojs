interface AppState {
  clickCount: number;
  messages: string[];
}

class App {
  private state: AppState = {
    clickCount: 0,
    messages: []
  };

  private outputElement: HTMLElement;

  constructor() {
    this.outputElement = document.getElementById('output')!;
    this.setupEventListeners();
    this.render();
  }

  private setupEventListeners(): void {
    const button = document.getElementById('clickMe');
    if (button) {
      button.addEventListener('click', () => this.handleClick());
    }
  }

  private handleClick(): void {
    this.state.clickCount++;
    const message = `Button clicked ${this.state.clickCount} time${this.state.clickCount === 1 ? '' : 's'}!`;
    this.state.messages.push(`[${new Date().toLocaleTimeString()}] ${message}`);
    this.render();
  }

  private render(): void {
    const content = this.state.messages.length > 0
      ? `<h3>Activity Log:</h3><ul>${this.state.messages.map(msg => `<li>${msg}</li>`).join('')}</ul>`
      : '<p>Click the button above to see some TypeScript in action!</p>';
    
    this.outputElement.innerHTML = content;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});