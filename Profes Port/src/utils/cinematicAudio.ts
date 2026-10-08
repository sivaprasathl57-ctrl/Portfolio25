// Web Audio API Cinematic Sound Engine
// Synthesizes atmospheric drone, metallic shimmer, and entry impact without any external files.

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private isMuted: boolean = true;
  private oscNodes: OscillatorNode[] = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startDrone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    this.stopDrone();

    try {
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0, this.ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
      master.connect(this.ctx.destination);
      this.droneGain = master;

      // Filter for deep warm cinematic tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      filter.connect(master);

      // Low fundamental drone: 55Hz (A1) & 82.4Hz (E2)
      const freqs = [55, 82.41, 110];
      this.oscNodes = freqs.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        const subGain = this.ctx!.createGain();
        subGain.gain.setValueAtTime(i === 0 ? 0.6 : 0.25, this.ctx!.currentTime);
        osc.connect(subGain);
        subGain.connect(filter);
        osc.start();
        return osc;
      });
    } catch {
      // Audio autoplay policy or device fallback
    }
  }

  public stopDrone() {
    if (this.droneGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          this.oscNodes.forEach(o => {
            try { o.stop(); o.disconnect(); } catch {}
          });
          this.oscNodes = [];
          this.droneGain = null;
        }, 1300);
      } catch {
        this.oscNodes = [];
        this.droneGain = null;
      }
    }
  }

  public playHoverShimmer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {}
  }

  public playEnterWarp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Cinematic sub-bass drop impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.5);

      // 2. High shimmer whoosh
      const sweepOsc = this.ctx.createOscillator();
      const sweepGain = this.ctx.createGain();
      sweepOsc.type = 'triangle';
      sweepOsc.frequency.setValueAtTime(220, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.8);

      sweepGain.gain.setValueAtTime(0.08, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(this.ctx.destination);
      sweepOsc.start(now);
      sweepOsc.stop(now + 1.0);
    } catch {}
  }

  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  public playAccessGranted() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.6);
      });
    } catch {}
  }
}

export const cinematicAudio = new CinematicAudioEngine();
