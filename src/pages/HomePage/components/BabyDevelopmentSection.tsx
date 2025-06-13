import React, { useState } from 'react';
import { FaBaby } from 'react-icons/fa';
import { styles } from '../HomePage.styles';
import { fetchBabyDevelopmentInfo } from '../../../services/baby-development-service';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader } from "../../../components/Loader/Loader";

export const BabyDevelopmentSection = () => {
  const [age, setAge] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetInfo = async () => {
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 60) {
      setError('Please enter an age between 1 and 60 months');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const developmentInfo = await fetchBabyDevelopmentInfo(parseInt(age));
      setInfo(developmentInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch information');
      setInfo('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={styles.recordingSection}>
      <div style={styles.recordingHeader}>
        <h2 style={styles.recordingTitle}>
          <span style={{ marginRight: 8, color: '#4299E1', verticalAlign: 'middle' }}>
            <FaBaby />
          </span>
          Baby Development Tracker
        </h2>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexDirection: 'column' }}>
        <label
          htmlFor="ageInput"
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2D3748',
            marginBottom: '0.5rem'
          }}
        >
          Age in Months (1-60)
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            id="ageInput"
            type="number"
            min="1"
            max="60"
            value={age}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) {
                setAge('');
              } else if (value < 1) {
                setAge('1');
              } else if (value > 60) {
                setAge('60');
              } else {
                setAge(value.toString());
              }
            }}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontSize: '1.05rem',
              border: '1px solid #E2E8F0',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
            placeholder="Enter age in months (1-60)"
          />
          <button
            onClick={handleGetInfo}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              minWidth: '200px',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Information'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: '#E53E3E', marginBottom: '1rem', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      <div style={{ ...styles.transcriptionContent, padding: "2rem" }}>
        <div className="markdown-content">
          {isLoading ? (
            <Loader size="medium" message="Fetching development information..." />
          ) : info ? (
            <ReactMarkdown rehypePlugins={[remarkGfm]}>{info}</ReactMarkdown>
          ) : (
            <div style={{ color: '#718096', textAlign: 'center' }}>
              Enter an age in months to see development information
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
