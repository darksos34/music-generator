import React, { useRef, useState } from "react";
import "./AudioPulseGenerator.css";

export const AudioPulseGenerator: React.FC = () => {

    // Core audio engine refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const trackSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const intervalRef = useRef<number | null>(null);

    // UI state
    const [bpm, setBpm] = useState(140);
    const [frequency, setFrequency] = useState(80);
    const [playing, setPlaying] = useState(false);

    // Load external audio track
    const loadTrack = async (file: File) => {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();

        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);

        const source = audioCtxRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtxRef.current.destination);

        trackSourceRef.current = source;
    };

    // Start generator + track
    const start = () => {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();

        // Start track if loaded
        trackSourceRef.current?.start();

        // Create oscillator
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = "sawtooth"; // generiek, later configureerbaar
        osc.frequency.value = frequency;
        gain.gain.value = 0;

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;

        // Pulse timing
        const intervalMs = 60000 / bpm;

        intervalRef.current = window.setInterval(() => {
            const now = audioCtxRef.current!.currentTime;
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(0.9, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        }, intervalMs);

        setPlaying(true);
    };

    // Stop generator + track
    const stop = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (gainRef.current && audioCtxRef.current) {
            gainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        }

        trackSourceRef.current?.stop();
        setPlaying(false);
    };

    return (
        <section className="generator-card audio-card" aria-label="Audio Pulse Generator Controls">
            <span className="audio-badge">Pulse Lab</span>
            <h2 className="audio-title">Audio Pulse Generator</h2>

            <div className="audio-controls">
                <input
                    className="audio-file"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) loadTrack(file);
                    }}
                />

                <button className="audio-button" onClick={playing ? stop : start}>
                    {playing ? "Stop" : "Start"}
                </button>

                <div className="audio-control">
                    <label htmlFor="audio-bpm">BPM: {bpm}</label>
                    <input
                        id="audio-bpm"
                        className="audio-range"
                        type="range"
                        min={60}
                        max={240}
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                    />
                </div>

                <div className="audio-control">
                    <label htmlFor="audio-frequency">Pulse Frequency: {frequency} Hz</label>
                    <input
                        id="audio-frequency"
                        className="audio-range"
                        type="range"
                        min={20}
                        max={200}
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                    />
                </div>
            </div>
        </section>
    );
};