import './App.css'
import {ToneGenerator} from "./ToneGenerator.tsx";
import {UmptempoGenerator} from "./UptemptoGenerator.tsx";

function App() {
  return (
      <>

        <ToneGenerator/>
        <UmptempoGenerator/>
        <div className="ticks"></div>
        <section id="spacer"></section>
      </>
  )
}

export default App
