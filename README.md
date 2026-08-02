## AudioPulseGenerator – Technical Proof of Concept

This repository contains a technical proof of concept demonstrating how browser‑based audio generation and real‑time pulse timing can be combined with external audio playback using the Web Audio API.

The goal of this POC is to prove functionality, validate feasibility, and provide a minimal, generic foundation for future audio‑driven tools or SaaS concepts.

### 🎯 Objective

The AudioPulseGenerator shows that a web application can:

* Load and decode audio files directly in the browser
* Play a track while generating additional synthesized audio
* Produce timed pulses based on BPM
* Combine multiple audio nodes (oscillator + gain + track)
* Run fully client‑side without backend dependencies

This POC is intentionally simple, generic, and easy to extend.

### 🚀 Core Features
* Load and play external audio (MP3, WAV, FLAC, etc.)
* Oscillator‑based pulse generator
* BPM‑driven pulse timing 
* Adjustable oscillator frequency 
* Start/stop control 
* Clean architecture suitable for expansion

### 🧩 Architecture Overview
* Audio Engine — manages AudioContext, oscillator, gain nodes, and timing
* Track Loader — decodes and plays audio files
* Pulse Generator — creates timed pulses based on BPM
The structure is intentionally modular to support future enhancements.

### 📦 Installation

```bash
npm install
npm run dev
```
Requires a React + TypeScript environment (e.g., Vite).

### 🛠️ Usage
Import the component:

```tsx
import { AudioPulseGenerator } from "./AudioPulseGenerator";
```
Render it:

```tsx
<AudioPulseGenerator />
```
### 🧪 POC Limitations
This proof of concept is not production‑ready.
Current limitations include:

* No error handling for invalid audio files
* Minimal UI styling
* Single oscillator layer
* No presets or configuration system
* No backend or API integration

The purpose is demonstration, not deployment.

### 🔮 Future Extensions
This POC can evolve into more advanced audio tools:

* Multiple oscillators
* Filters (LPF/HPF)
* Audio effects
* Sequencer / pattern engine
* Preset system
* API‑driven configuration
* Full SaaS platform

### 📄 License
Free to use for demonstrations, prototypes, and client presentations.