import "../componentCss/LetterComp.css";

const LetterComponent = ({ letter, onDataSend }) => {
  const textColor = letter === "C" ? "#ffff00" : "#d9dcdbff";
  const handleData = (value) => {
    onDataSend(value);
  };
  return (
    <div className="hive">
      <svg
        className="hive-cell center"
        viewBox="0 0 120 103.92304845413263"
        style={{ width: "90px" }}
      >
        <polygon
          onClick={() => handleData({ letter })}
          style={{ fill: textColor, fontSize: "20px" }}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
        ></polygon>
        <text
          className="cell-letter"
          x="50%"
          y="50%"
          dy="0.35em"
          value={letter}
        >
          {letter}
        </text>
      </svg>
    </div>
  );
};

export default LetterComponent;
