import { useEffect, useState } from "react";
import "./App.css";
import AllLetterDiv from "./components/AllLetterDiv";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <div className="App">
      <div className="header-container">
        <span className="spelling-bee-heading">Spelling Bee</span>
        <span className="current-date">{currentDate}</span>
      </div>
      <hr />
      <AllLetterDiv />
    </div>
  );
}

export default App;
