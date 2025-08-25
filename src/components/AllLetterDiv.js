import React, { useState, useEffect, useRef } from "react";
import LetterComponent from "./LetterComponent";
import "../componentCss/AllLetterCss.css";
// import '../componentCss/RankProgress.css'
import ScoreRankingPage from "./ScoreRankingPage";

const AllLetterDiv = () => {
  const [data, setData] = useState([
    { id: 1, name: "A" },
    { id: 2, name: "I" },
    { id: 3, name: "T" },
    { id: 4, name: "C" },
    { id: 5, name: "N" },
    { id: 6, name: "G" },
    { id: 7, name: "V" },
  ]);
  const wordDic = [
    { word: "activating", score: 10 },
    { word: "inactivating", score: 12 },
    { word: "vacating", score: 8 },
    { word: "vaccinating", score: 11 },
    { word: "acacia", score: 6 },
    { word: "acai", score: 4 },
    { word: "acing", score: 5 },
    { word: "acting", score: 6 },
    { word: "antic", score: 5 },
    { word: "attic", score: 5 },
    { word: "cacti", score: 5 },
    { word: "caging", score: 6 },
    { word: "cancan", score: 6 },
    { word: "caning", score: 6 },
    { word: "canna", score: 5 },
    { word: "canning", score: 7 },
    { word: "cant", score: 4 },
    { word: "cantata", score: 7 },
    { word: "cantina", score: 7 },
    { word: "cava", score: 4 },
    { word: "caving", score: 6 },
    { word: "citing", score: 6 },
    { word: "civic", score: 5 },
    { word: "gigantic", score: 8 },
    { word: "icing", score: 5 },
    { word: "incant", score: 6 },
    { word: "incanting", score: 9 },
    { word: "inciting", score: 8 },
    { word: "intact", score: 6 },
    { word: "niacin", score: 6 },
    { word: "tacit", score: 5 },
    { word: "tact", score: 4 },
    { word: "tactic", score: 6 },
    { word: "tactician", score: 10 },
    { word: "tannic", score: 6 },
    { word: "tinct", score: 5 },
    { word: "titanic", score: 7 },
    { word: "vacant", score: 6 },
  ];

  const ranks = [
    { name: "Genius", minScore: 245 },
    { name: "Amazing", minScore: 190 },
    { name: "Great", minScore: 139 },
    { name: "Nice", minScore: 101 },
    { name: "Solid", minScore: 76 },
    { name: "Good", minScore: 51 },
    { name: "Moving Up", minScore: 25 },
    { name: "Good Start", minScore: 13 },
    { name: "Beginner", minScore: 0 },
  ];

  const [lengthError, setLengthError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [CharacterMissingError, setCharacterMissingError] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [markedWord, setMarkedWord] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const allowedLetters = data.map((item) => item.name.toUpperCase());
  const requiredLetter = "C";

  //Logic for click anywhere outside the ScoreRankingPage will be closed
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [showModal]);
  //handle the input feild contain only alphabets
  const handleChange = (event) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z]/g, "");
    if (filteredValue.length > 15) {
      setLengthError("Length is too Long");
      setInputValue("");
      return;
    }
    setInputValue(filteredValue);
  };

  // Shuffle Array function
  function shuffleArray(array, requiredLetter) {
    const originalIndex = array.findIndex(
      (item) => item.name === requiredLetter
    );
    if (originalIndex === -1) return array;

    const newArray = [...array];
    const [requiredItem] = newArray.splice(originalIndex, 1);

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    // Place required letter back at original position
    newArray.splice(originalIndex, 0, requiredItem);

    return newArray;
  }

  //Apply shuffle array  on function click
  const handleShuffle = () => {
    const shuffledItems = shuffleArray(data, requiredLetter);
    setData(shuffledItems);
  };

  //Remove LastCharacter from the input
  const handleRemoveLastChar = () => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  //Recieve data from the child component pressed (LetterComponent.js) and set it in input value
  const handleChildData = (data) => {
    const newValue = inputValue + data.letter;
    if (newValue.length > 15) {
      setLengthError("Length is to Long");
      setInputValue("");
    }
    setInputValue(newValue);
  };

  //handle the ScoreRanking page wheater is show or not
  const handleScoreRankChildData = (data) => {
    setShowModal(data);
  };

  //Check the validation of letter that are type or click
  const CheckWordValidation = () => {
    if (inputValue.length === 0) {
      setLengthError("Pleasse type or click letter");
    } else {
      if (inputValue.length < 4) {
        //alert("length is too small")
        setLengthError("Length is too sort");
      }

      //Filter the input data weather it contain c character or not if not show error
      const filteredDataCaseInsensitive = inputValue
        .toUpperCase()
        .includes("C");
      if (!filteredDataCaseInsensitive) {
        if (inputValue.length > 3)
          setCharacterMissingError("Center letter is missing");
      }
    }
  };

  //useEffect to handle the input feild if error occur if cleanUp the input field
  useEffect(() => {
    if (lengthError || CharacterMissingError || result) {
      const timer = setTimeout(() => {
        setLengthError("");
        setCharacterMissingError("");
        setResult("");
      }, 1000);
      setInputValue("");
      return () => clearTimeout(timer);
    }
  }, [lengthError, CharacterMissingError, result]);

  //Suffle the array with the reload or refreshing the page
  useEffect(() => {
    const shuffleItems = shuffleArray(data, requiredLetter);
    setData(shuffleItems);
  }, []);

  //Handle the press enter key or backspace key or space to funtion according to press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        handleRemoveLastChar();
      } else if (e.key === "Enter") {
        e.preventDefault();
        CheckWordValidation();
        finalResult();
      } else if (e.code === "Space") {
        e.preventDefault();
        handleShuffle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue]);

  //main logic where the input word compare with the wordDic word if present increse score if not through error
  const finalResult = () => {
    const found = wordDic.find(
      (obj) => obj.word.toLowerCase() === inputValue.toLowerCase()
    );

    if (found) {
      if (!markedWord.includes(found.word)) {
        setScore((prev) => prev + found.score);
        setMarkedWord((prev) => [...prev, found.word]);
        setResult(`Matched! You got ${found.score} points.`);
      } else {
        setResult("Already used this word.");
      }
    } else {
      if (inputValue.length >= 4 && inputValue.toUpperCase().includes("C")) {
        setResult("Bad word.");
        // console.log("This word not found.");
      }
    }

    setInputValue("");
  };

  return (
    <div className="AllLetterMain_div">
      {/* Left Section */}
      <div className="Left-div">
        <div style={{ fontSize: "2rem", fontWeight: "bold", margin: "auto" }}>
          {/* Input feild div */}
          <div
            className="input-custom"
            onClick={() => document.getElementById("hidden-input").focus()}
            style={{
              width: "500px",
              height: "50px",
              fontSize: "30px",
              border: "none",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "white",
              cursor: "text",
            }}
          >
            {inputValue.length === 0 ? (
              <span style={{ color: "#aaa", fontStyle: "", fontSize: "24px" }}>
                Type or Click
              </span>
            ) : (
              inputValue.split("").map((char, index) => {
                let color = "gray"; //default color to all element gray
                if (char.toUpperCase() === "C") {
                  color = "gold";
                } else if (allowedLetters.includes(char.toUpperCase())) {
                  color = "black";
                }
                return (
                  <span
                    key={index}
                    style={{ color, marginRight: "4px", fontWeight: "bold" }}
                  >
                    {char.toUpperCase()}
                  </span>
                );
              })
            )}
            <input
              className="input-blink"
              id="hidden-input"
              type="text"
              style={{
                opacity: 0,
                width: "1px",
                height: "1px",
                position: "absolute",
              }}
              value={inputValue}
              onChange={handleChange}
              autoFocus
            />
          </div>
          {/* handling the errors and showing on the screen when and error occur */}
          {lengthError && (
            <p
              className="error-msg"
              style={{ color: "red", position: "fixed", marginLeft: "300px" }}
            >
              {lengthError}
            </p>
          )}
          {CharacterMissingError && (
            <p
              className="error-msg"
              style={{ color: "red", position: "fixed", marginLeft: "300px" }}
            >
              {CharacterMissingError}
            </p>
          )}
          {result && (
            <p
              className="error-msg"
              style={{ color: "green", position: "fixed", marginLeft: "320px" }}
            >
              {result}
            </p>
          )}
        </div>
        {/* Polygon shape design*/}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1px",
            maxWidth: "65%",
            overflow: "visible",
            marginLeft: "160px",
            marginTop: "40px",
          }}
        >
          {/* {data.map((item) => (
            <LetterComponent
              key={item.id}
              letter={item.name}
              onDataSend={handleChildData}
            />
          ))} */}
          <div className="letter-component-element-0">
            <LetterComponent
              letter={data[0].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-1">
            <LetterComponent
              letter={data[1].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-2">
            <LetterComponent
              letter={data[2].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-3">
            <LetterComponent
              letter={data[3].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-4">
            <LetterComponent
              letter={data[4].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-5">
            <LetterComponent
              letter={data[5].name}
              onDataSend={handleChildData}
            />
          </div>
          <div className="letter-component-element-6">
            <LetterComponent
              letter={data[6].name}
              onDataSend={handleChildData}
            />
          </div>
        </div>
        {/* button div that contain enter refresh and delete button */}
        <div className="buttons-div">
          <div>
            <button
              style={{ cursor: "pointer" }}
              onClick={handleRemoveLastChar}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={handleShuffle}
              style={{
                padding: "8px",
                border: "none",
                background: "rgba(225, 221, 221, 1)",
                cursor: "pointer",
              }}
            >
              {/* image that used in refresh button inside */}
              <img
                src="/Images/reloadIcon.png"
                alt="Reload"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain",
                  display: "block",
                  margin: "auto",
                }}
              />
            </button>
          </div>
          <div>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                CheckWordValidation();
                finalResult();
              }}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
      {/* <hr/> */}
      {/* show modal component */}
      {showModal && (
        <div className="" ref={modalRef} style={{ position: "fixed" }}>
          {" "}
          <ScoreRankingPage
            onDataSend={handleScoreRankChildData}
            score={score}
          />{" "}
        </div>
      )}
      {/* right section */}
      <div className="right-div">
        {/* progress bar div */}
        <div className="progress-bar-style-div">
          {!showModal && (
            <div className="tooltip-container">
              <div
                className="progress-wrapper"
                onClick={() => setShowModal(true)}
              >
                <div className="progress-bar-background">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(score / ranks[0].minScore) * 100}%` }}
                  >
                    <span className="score-text">{score}</span>
                  </div>
                  <span className="min-score-text">{ranks[0].minScore}</span>
                </div>
              </div>

              <span className="tooltip-text">Click to see today's ranks</span>
            </div>
          )}
        </div>
        {/* word count section */}
        <div className="right-Inner-first-div">
          <div className="word-count-div">
            <p>
              You have found {markedWord.length} word and achieve {score} points
            </p>
          </div>
          <div className="table-div">
            <table>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}} className="result-words">Words</th>
                </tr>
              </thead>
              <tbody>
                {/* showing marked word in scoreRanking page */}
                {markedWord.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "left",fontSize:'small' }}>
                      {row.toUpperCase()} <hr width="200%" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLetterDiv;
