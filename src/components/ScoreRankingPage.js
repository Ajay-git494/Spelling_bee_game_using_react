import React from 'react';
import '../componentCss/ScoreRanking.css';

const ranks = [
  { name: 'Genius', minScore: 245 },
  { name: 'Amazing', minScore: 190 },
  { name: 'Great', minScore: 139 },
  { name: 'Nice', minScore: 101 },
  { name: 'Solid', minScore: 76 },
  { name: 'Good', minScore: 51 },
  { name: 'Moving Up', minScore: 25 },
  { name: 'Good Start', minScore: 13 },
  { name: 'Beginner', minScore: 0 }
];

const ScoreRankingPage = ({ onDataSend, score }) => {
  const handleShow = (value) => {
    onDataSend(value);
  };

  // Find current rank index
  const currentRankIndex = ranks.findIndex((rank) => score >= rank.minScore);

  
  return (
    <div className='Score-modal-main-div'>
      <button
        style={{
          backgroundColor: 'white',
          color: 'grey',
          padding: '5px 10px',
          borderRadius: '10px',
          cursor: 'pointer',
          border: 'none',
          marginLeft: '560px',
          marginTop: '10px',
        }}
        onClick={() => handleShow(false)}
      >
        X
      </button>

      <div className='ranking-heading-main-div'>
        <h1 className='ranking-heading'>Ranking</h1>
        <p className='ranking-paragraph'>Rankings are based on percentage of possible points in a puzzle</p>
      </div>

      <div>
        <div className='container'>
          <div className='column left-column'>
            <h2>Rank</h2>
            {ranks.map((rank, index) => (
              <p
                key={index}
                style={{
                  color: score >= rank.minScore ? 'grey' : 'black',
                  fontWeight: score >= rank.minScore ? 'bold' : 'normal',
                }}
              >
                {rank.name} ({score >= rank.minScore ? `${score}` : `need ${rank.minScore - score}`})
              </p>
            ))}
          </div>
              
          <div className='column right-column'>
            <h2>Minimum Score</h2>
            {ranks.map((rank, index) => (
              <p
                key={index}
                style={{
                  color: score >= rank.minScore ? 'gray' : 'black',
                  fontWeight: score >= rank.minScore ? 'bold' : 'normal',
                }}
              >
                {rank.minScore}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreRankingPage;