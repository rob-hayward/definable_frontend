import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import PieChart from './components/PieChart';
import './DefinableDetail.css';

const WordVoteType = {
  POSITIVE: 1,
  NEGATIVE: -1,
  NO_VOTE: 0
};

function DefinableDetail() {
  const [word, setWord] = useState({});
  const [userWordVote, setUserWordVote] = useState(null);
  const [userDefinitionVote, setUserDefinitionVote] = useState(null);
  const [sortOrder, setSortOrder] = useState('most_popular'); // Added state for sort order
  const { id } = useParams();

  useEffect(() => {
    // Function to fetch word details
    const fetchWordDetails = async (sortOption) => {
      try {
        const response = await axiosInstance.get(`/api/v1/definable_detail/${id}?sort_by=${sortOption}`);
        setWord(response.data);
      } catch (error) {
        console.error('Error fetching word details:', error);
      }
    };

    fetchWordDetails(sortOrder); // Fetch word details with the current sorting order
  }, [id, sortOrder]); // Depend on sortOrder

  const handleVote = (voteId, isWordVote, voteType = WordVoteType.POSITIVE) => {
    const url = isWordVote ? `/api/v1/word_vote/${voteId}/` : `/api/v1/definition_vote/${voteId}/`;
    const data = isWordVote ? { vote_type: voteType } : {};

    axiosInstance.post(url, data)
      .then(() => {
        console.log('Vote registered successfully');
        return axiosInstance.get(`/api/v1/definable_detail/${id}`);
      })
      .then(response => {
        const updatedWordData = response.data;
        setWord(updatedWordData);
        if (isWordVote) {
          setUserWordVote(updatedWordData.user_word_vote);
        } else {
          setUserDefinitionVote(updatedWordData.user_vote?.definition_id || null);
        }
      })
      .catch(error => {
        console.error('Error casting vote:', error);
      });
  };

  const renderDefinitionVoteButton = (def) => (
    <div className="vote-container">
      <button
        className={`vote-button ${userDefinitionVote === def.id ? 'voted' : ''}`}
        onClick={() => handleVote(def.id, false)}
        aria-label={`Vote for definition ${def.id}`}
      >
        Vote
      </button>
      <span>Total votes: {def.total_votes}</span>
    </div>
  );

  const renderWordVoteButtons = () => {
    return (
      <div className="word-vote-buttons">
        <button
          className={`vote-button approve ${userWordVote === WordVoteType.POSITIVE ? 'voted' : ''}`}
          onClick={() => handleVote(word.id, true, WordVoteType.POSITIVE)}
          aria-label="Approve word"
        >
          Approve Word
        </button>
        <button
          className={`vote-button reject ${userWordVote === WordVoteType.NEGATIVE ? 'voted' : ''}`}
          onClick={() => handleVote(word.id, true, WordVoteType.NEGATIVE)}
          aria-label="Reject word"
        >
          Reject Word
        </button>
      </div>
    );
  };

   // Function to handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="definable-detail-container">
      <h2 className="word-title">{word.word}</h2>
      <div className="word-vote-section">
        <div className="piechart-vote-container">
          <div className="piechart-container">
            <PieChart word={word} />
          </div>
          {renderWordVoteButtons()}
        </div>
      </div>
      {word.live_definition && (
        <div className="live-definition">
          <h4>Definition:</h4>
          <p>{word.live_definition.definition_text}</p>
          {renderDefinitionVoteButton(word.live_definition)}
        </div>
      )}
      <h4>Alternative Definitions:</h4>
      <div className="sorting-options">
        <label htmlFor="sortOrder">Order by:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="most_popular">Most Popular</option>
          <option value="oldest_first">Oldest First</option>
          <option value="newest_first">Newest First</option>
        </select>
      </div>
      <ul className="alternative-definitions">
        {word.definitions?.map((def) => (
          <li key={def.id}>
            <div className="definition-text">
              {def.definition_text}
            </div>
            {renderDefinitionVoteButton(def)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DefinableDetail;

