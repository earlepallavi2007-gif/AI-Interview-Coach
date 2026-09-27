import React, { useState } from "react";
import "./InterviewHistory.css";

function InterviewHistory({ onBack }) {
  const [selectedInterview, setSelectedInterview] = useState(null);

  const history =
    JSON.parse(localStorage.getItem("interviewHistory")) || [];
 const totalInterviews = history.length;

const averageScore =
  totalInterviews > 0
    ? (
        history.reduce(
          (sum, interview) => sum + interview.overallScore,
          0
        ) / totalInterviews
      ).toFixed(1)
    : "0.0";

const totalQuestions = history.reduce(
  (sum, interview) =>
    sum + (Array.isArray(interview.answers) ? interview.answers.length : 0),
  0
);

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Interview History</h1>

        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>

     <div className="dashboard-stats">
  <div className="stat-card">
    <span>Total Interviews</span>
    <strong>{totalInterviews}</strong>
  </div>

  <div className="stat-card">
    <span>Average Score</span>
    <strong>{averageScore}/10</strong>
  </div>

  <div className="stat-card">
    <span>Questions Answered</span>
    <strong>{totalQuestions}</strong>
  </div>
</div> 

      {history.length === 0 ? (
        <p>No interviews completed yet.</p>
      ) : (
        <div className="history-list">
          {history.map((interview) => (
            <div className="history-card" key={interview.id}>
              <h2>{interview.role}</h2>

              <div className="history-date">
                {interview.date}
              </div>

              <div className="history-info">
                {interview.experience} • {interview.interviewType} •{" "}
                {interview.questionCount} Questions
              </div>

              <div className="history-score">
                Overall Score: {interview.overallScore}/10
              </div>

              <button
                className="details-button"
                onClick={() => setSelectedInterview(interview)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedInterview && (
        <div className="details-section">
          <div className="details-header">
            <h2>Interview Details</h2>

            <button
              className="back-button"
              onClick={() => setSelectedInterview(null)}
            >
              Close
            </button>
          </div>

          <p>
            <strong>Role:</strong> {selectedInterview.role}
          </p>

          <p>
            <strong>Date:</strong> {selectedInterview.date}
          </p>

          <p>
            <strong>Overall Score:</strong>{" "}
            {selectedInterview.overallScore}/10
          </p>

          <div className="answer-list">
            {(selectedInterview.answers || []).map((item) => (
              <div
                className="answer-card"
                key={item.questionNumber}
              >
                <h3>Question {item.questionNumber}</h3>

                <p>
                  <strong>Question:</strong> {item.question}
                </p>

                <p>
                  <strong>Your Answer:</strong> {item.answer}
                </p>

                <div className="evaluation">
                  <strong>Evaluation</strong>

                  <p>
                    Relevance: {item.evaluation.relevance}/10
                  </p>

                  <p>
                    Clarity: {item.evaluation.clarity}/10
                  </p>

                  <p>
                    Technical Accuracy:{" "}
                    {item.evaluation.technicalAccuracy}/10
                  </p>

                  <p>
                    Communication:{" "}
                    {item.evaluation.communication}/10
                  </p>

                  <p>
                    Overall: {item.evaluation.overallScore}/10
                  </p>

                  <p>{item.evaluation.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewHistory;