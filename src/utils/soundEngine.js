// src/utils/soundEngine.js
// Silent Audio Interface — All sounds disabled for a pure, distraction-free formal editorial experience

class SoundEngine {
  constructor() {
    this.muted = true;
  }
  init() {}
  setMuted() {}
  playHover() {}
  playClick() {}
  playTransition() {}
  playSuccess() {}
}

export const sounds = new SoundEngine();
