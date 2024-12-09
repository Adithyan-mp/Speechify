import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './Feedback.css';  // Assuming the CSS is in this file

const Feedback = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const testHistory = Array(15).fill().map((_, i) => ({
    id: i,
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleString(),
    wpm: 70 + Math.random() * 10,
    raw: 65 + Math.random() * 10,
    accuracy: 95 + Math.random() * 5,
    consistency: 80 + Math.random() * 10,
    achievement: i === 2 ? "New Personal Best!" : null
  }));

  const CustomDot = ({ cx, cy, payload }) => (
    <g transform={`translate(${cx},${cy})`}>
      <circle 
        r={payload.achievement ? 6 : 4}
        fill={payload.achievement ? "#f97316" : "#3b82f6"}
        style={{ cursor: 'pointer' }}
        onClick={() => setSelectedTest(payload)}
      />
      {payload.achievement && (
        <circle 
          r={8}
          fill="none"
          stroke="#f97316"
          strokeWidth={1}
          style={{ opacity: 0.5 }}
        />
      )}
    </g>
  );

  return (
    <div className="type-summary-container">
      <div className="container">
        <div className="metrics-section">
          <div className="metrics">
            <div className="metric">
              <span className="metric-label">wpm</span>
              <span className="metric-value">70</span>
            </div>
            <div className="metric">
              <span className="metric-label">acc</span>
              <span className="metric-value">100%</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={testHistory}>
              <XAxis 
                dataKey="timestamp" 
                stroke="#3b82f6"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#3b82f6"
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#18181b', 
                  border: '1px solid #3b82f6',
                  fontSize: '14px'
                }}
                labelStyle={{ color: '#3b82f6' }}
              />
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={<CustomDot />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {selectedTest && (
          <div className="test-review-panel">
            <div className="test-header">
              <h3 className="test-timestamp">{selectedTest.timestamp}</h3>
              {selectedTest.achievement && (
                <span className="achievement-tag">
                  {selectedTest.achievement}
                </span>
              )}
            </div>
            <div className="test-details">
              <div className="test-detail">
                <span className="test-label">WPM:</span>
                <span>{selectedTest.wpm.toFixed(1)}</span>
              </div>
              <div className="test-detail">
                <span className="test-label">Raw:</span>
                <span>{selectedTest.raw.toFixed(1)}</span>
              </div>
              <div className="test-detail">
                <span className="test-label">Accuracy:</span>
                <span>{selectedTest.accuracy.toFixed(1)}%</span>
              </div>
              <div className="test-detail">
                <span className="test-label">Consistency:</span>
                <span>{selectedTest.consistency.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        <div className="metrics-grid">
          <div className="metrics-item">
            <div className="metrics-item-label">raw</div>
            <div className="metrics-item-value">70</div>
          </div>
          <div className="metrics-item">
            <div className="metrics-item-label">characters</div>
            <div className="metrics-item-value">88/0/0/0</div>
          </div>
          <div className="metrics-item">
            <div className="metrics-item-label">consistency</div>
            <div className="metrics-item-value">83%</div>
          </div>
          <div className="metrics-item">
            <div className="metrics-item-label">time</div>
            <div className="metrics-item-value">15s</div>
          </div>
        </div>

        <div className="test-type-section">
          <div className="test-type-label">test type</div>
          <div className="test-type-value">time 15</div>
          <div className="test-type-value">english</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
