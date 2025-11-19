// Sound effects manager using Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  // Generate chip sound effect
  private createChipSound() {
    if (!this.audioContext) return;
    
    const duration = 0.15;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Create a metallic "clink" sound
      data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 15) * 0.3;
      data[i] += Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-t * 20) * 0.2;
    }

    return buffer;
  }

  // Generate card shuffle/deal sound
  private createCardSound() {
    if (!this.audioContext) return;
    
    const duration = 0.08;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Create a soft swoosh sound
      const noise = (Math.random() * 2 - 1) * Math.exp(-t * 30);
      data[i] = noise * 0.2;
    }

    return buffer;
  }

  // Generate notification/chat sound
  private createNotificationSound() {
    if (!this.audioContext) return;
    
    const duration = 0.2;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Gentle notification beep
      data[i] = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 8) * 0.25;
      data[i] += Math.sin(2 * Math.PI * 900 * t) * Math.exp(-t * 10) * 0.15;
    }

    return buffer;
  }

  // Generate win sound
  private createWinSound() {
    if (!this.audioContext) return;
    
    const duration = 0.6;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Upward scale of notes
      const freq = 400 + (t * 400);
      data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 3) * 0.3;
    }

    return buffer;
  }

  // Generate button click sound
  private createClickSound() {
    if (!this.audioContext) return;
    
    const duration = 0.05;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      data[i] = Math.sin(2 * Math.PI * 400 * t) * Math.exp(-t * 40) * 0.2;
    }

    return buffer;
  }

  // Generate error/buzzer sound
  private createErrorSound() {
    if (!this.audioContext) return;
    
    const duration = 0.3;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      // Low buzzer tone
      data[i] = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 6) * 0.25;
    }

    return buffer;
  }

  // Generate typing sound
  private createTypingSound() {
    if (!this.audioContext) return;
    
    const duration = 0.03;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const noise = (Math.random() * 2 - 1) * Math.exp(-t * 60);
      data[i] = noise * 0.15;
    }

    return buffer;
  }

  // Generate turn indicator sound
  private createTurnSound() {
    if (!this.audioContext) return;
    
    const duration = 0.25;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      data[i] = Math.sin(2 * Math.PI * 500 * t) * Math.exp(-t * 10) * 0.2;
      data[i] += Math.sin(2 * Math.PI * 700 * t) * Math.exp(-t * 12) * 0.15;
    }

    return buffer;
  }

  // Initialize all sound effects
  initialize() {
    if (!this.audioContext) return;

    this.sounds.set('chip', this.createChipSound()!);
    this.sounds.set('card', this.createCardSound()!);
    this.sounds.set('notification', this.createNotificationSound()!);
    this.sounds.set('win', this.createWinSound()!);
    this.sounds.set('click', this.createClickSound()!);
    this.sounds.set('error', this.createErrorSound()!);
    this.sounds.set('typing', this.createTypingSound()!);
    this.sounds.set('turn', this.createTurnSound()!);
  }

  // Play a sound effect
  play(soundName: string, volume: number = 1.0) {
    if (!this.enabled || !this.audioContext) return;

    const buffer = this.sounds.get(soundName);
    if (!buffer) {
      console.warn(`Sound "${soundName}" not found`);
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = Math.max(0, Math.min(1, volume));
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start(0);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Play specific sound effects with preset volumes
  playChip() { this.play('chip', 0.4); }
  playCard() { this.play('card', 0.3); }
  playNotification() { this.play('notification', 0.5); }
  playWin() { this.play('win', 0.6); }
  playClick() { this.play('click', 0.3); }
  playError() { this.play('error', 0.4); }
  playTyping() { this.play('typing', 0.2); }
  playTurn() { this.play('turn', 0.4); }
}

// Create singleton instance
export const soundEffects = new SoundEffects();

// Initialize sounds when module is loaded
if (typeof window !== 'undefined') {
  soundEffects.initialize();
}
