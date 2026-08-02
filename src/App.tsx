import { AudioPulseGenerator } from "./AudioPulseGenerator";
import { ToneGenerator } from "./ToneGenerator";
import "./Cards.css";

export default function App() {
    return (
        <main className="cards-page">
            <div className="cards-stack">
                <AudioPulseGenerator />
                <ToneGenerator />
            </div>
        </main>
    );
}