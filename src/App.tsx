import './App.css'
import {ToneGenerator} from "./ToneGenerator.tsx";
import {AudioPulseGenerator} from "./AudioPulseGenerator.tsx";

function App() {
  return (
      <>

        <ToneGenerator/>
        <AudioPulseGenerator/>
        <div className="ticks"></div>
        <section id="spacer"></section>
      </>
  )
}

export default App
