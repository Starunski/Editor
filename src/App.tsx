import { useState } from "react";
import "./App.css";
import { Title } from "./components/title/Title";
import { Slide } from "./components/slide/Slide";
import { useRef } from "react";
import jsPDF from "jspdf";

function App() {
  const [titleState, setTitleState] = useState({ value: "", show: false });
  const [list, setList] = useState([
    { id: 1, title: "Change title", subtitle: "Change subtitle1", icon: "add_circle_outline" },
    { id: 2, title: "Change title", subtitle: "Change subtitle2", icon: "add_circle_outline" },
    { id: 3, title: "Change title", subtitle: "Change subtitle3", icon: "add_circle_outline" },
  ]);

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a4",
      unit: "px",
    });

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");
    //@ts-ignore
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  return (
    <div className="App">
      <div className={"container"}>
        <div ref={reportTemplateRef}>
          <div>
            <Title titleState={titleState} setTitleState={setTitleState} />
            <Slide list={list} setList={setList} />
            <div className="button__container">
              <button onClick={handleGeneratePdf}> Generate PDF </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
