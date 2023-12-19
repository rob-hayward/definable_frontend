import React, { useEffect, useState, useRef } from 'react';
import axios from './axiosConfig';
import { Link } from 'react-router-dom';
import './DefinableDictionary.css';
import logo from './assets/D_logo.png';

function DefinableDictionary() {
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [statusFilter, setStatusFilter] = useState('approved');
  const wordRefs = useRef({});

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`/api/v1/definable_dictionary/?sort_by=${sortOrder}&status=${statusFilter}`);
        setWords(response.data);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchWords();
  }, [sortOrder, statusFilter]);

  useEffect(() => {
    if (searchTerm) {
      const foundWord = words.find(word => word.word.toLowerCase().startsWith(searchTerm.toLowerCase()));
      if (foundWord && wordRefs.current[foundWord.id]) {
        wordRefs.current[foundWord.id].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [searchTerm, words]);

  return (
    <div className="dictionary-container">
      <div className="dictionary-header">
        <img src={logo} alt="Logo" className="dictionary-logo"/>
        <h2>efinable Dictionary</h2>
      </div>
      <div className="sorting-options">
        <label htmlFor="sortOrder">Order by:</label>
        <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="alphabetical">Alphabetical</option>
          <option value="popularity">Popularity</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <label htmlFor="statusFilter">Word Status:</label>
        <select id="statusFilter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Start typing the word you are looking for..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul>
        {words.map(word => (
          <li key={word.id} ref={el => wordRefs.current[word.id] = el}>
            <div style={{ flexGrow: 1 }}>
              <strong>{word.word}:</strong> {word.live_definition.definition_text}
            </div>
            <Link to={`/dashboard/definable_detail/${word.id}`} style={{ marginLeft: '10px' }}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DefinableDictionary;
