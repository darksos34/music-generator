
import React, { useRef, useState } from "react";

export const UmptempoGenerator: React.FC = () => {

        const audioCtxRef = useRef<AudioContext | null>(null);
        const trackSourceRef = useRef<AudioBufferSourceNode | null>(null);
        const oscRef = useRef<OscillatorNode | null>(null);
        const gainRef = useRef<GainNode | null>(null);
        const intervalRef = useRef<number | null>(null);

        const [bpm, setBpm] = useState(180);
        const [freq, setFreq] = useState(80);
        const [playing, setPlaying] = useState(false);

        const loadTrack = async (file: File) => {
            if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();

            const arrayBuffer = await file.arrayBuffer();
            const audioBuffer = await audioCtxRef.current.decodeAudioData(arrayBuffer);

            const source = audioCtxRef.current.createBufferSource();
            source.buffer = audioBuffer;

            source.connect(audioCtxRef.current.destination);
            trackSourceRef.current = source;
        };

        const start = () => {
            if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();

            // Start track
            trackSourceRef.current?.start();

            // Create umptempo oscillator
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();

            osc.type = "sawtooth";
            osc.frequency.value = freq;
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

        const stop = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            gainRef.current?.gain.setValueAtTime(0, audioCtxRef.current!.currentTime);
            trackSourceRef.current?.stop();
            setPlaying(false);
        };

        return (
            <div style={{ padding: 20 }}>
                <h2>Umptempo + Real Track</h2>

                <input
                    type="file"
                    accept="audio/*"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) loadTrack(file);
                    }}
                />

                <button onClick={playing ? stop : start}>
                    {playing ? "Stop" : "Start"}
                </button>

                <div style={{ marginTop: 20 }}>
                    <label>BPM: {bpm}</label>
                    <input
                        type="range"
                        min={120}
                        max={220}
                        value={bpm}
                        onChange={e => setBpm(Number(e.target.value))}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <label>Pulse Frequency: {freq} Hz</label>
                    <input
                        type="range"
                        min={40}
                        max={200}
                        value={freq}
                        onChange={e => setFreq(Number(e.target.value))}
                    />
                </div>
            </div>
        );
    };