import React, { useEffect, useRef, useState } from "react";

type Waveform = "sine" | "square" | "sawtooth" | "triangle";

export const ToneGenerator: React.FC = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const [frequency, setFrequency] = useState<number>(440);
    const [volume, setVolume] = useState<number>(0.2);
    const [waveform, setWaveform] = useState<Waveform>("sine");
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!audioCtxRef.current) return;
        if (!oscillatorRef.current) return;

        oscillatorRef.current.frequency.value = frequency;
    }, [frequency]);

    useEffect(() => {
        if (!audioCtxRef.current) return;
        if (!gainRef.current) return;

        gainRef.current.gain.value = playing ? volume : 0;
    }, [volume, playing]);

    useEffect(() => {
        if (!oscillatorRef.current) return;
        oscillatorRef.current.type = waveform;
    }, [waveform]);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();

            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();

            osc.type = waveform;
            osc.frequency.value = frequency;
            gain.gain.value = volume;

            osc.connect(gain);
            gain.connect(audioCtxRef.current.destination);

            osc.start();

            oscillatorRef.current = osc;
            gainRef.current = gain;
        }
    };

    const toggle = () => {
        initAudio();
        setPlaying(prev => !prev);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Tone Generator</h2>

            <button onClick={toggle}>
                {playing ? "Stop" : "Start"}
            </button>

            <div style={{ marginTop: 20 }}>
                <label>Frequentie: {frequency} Hz</label>
                <input
                    type="range"
                    min={20}
                    max={20000}
                    value={frequency}
                    onChange={e => setFrequency(Number(e.target.value))}
                />
            </div>

            <div style={{ marginTop: 20 }}>
                <label>Volume: {volume.toFixed(2)}</label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                />
            </div>

            <div style={{ marginTop: 20 }}>
                <label>Waveform:</label>
                <select
                    value={waveform}
                    onChange={e => setWaveform(e.target.value as Waveform)}
                >
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
        </div>
    );
};