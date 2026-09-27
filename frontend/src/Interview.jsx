import { useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
} from "lucide-react";
import "./Interview.css";

function Interview({ settings, onExit }) {
  const [answer, setAnswer] = useState("");
const [submitted, setSubmitted] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(1);
const [evaluation, setEvaluation] = useState(null);
const [answerHistory, setAnswerHistory] = useState([]);
const [isEvaluating, setIsEvaluating] = useState(false);

  const questions = [
    "Tell me about yourself and your experience with software development.",
    "What is the difference between a stack and a queue?",
    "Explain the concept of object-oriented programming.",
    "What is the difference between SQL and NoSQL databases?",
    "How would you debug a program that is producing incorrect output?",
    "What is an API and why is it useful?",
    "Explain the difference between frontend and backend development.",
    "What is machine learning?",
    "How would you improve the performance of a slow application?",
    "Why should we hire you for this role?",
  ];

  const question = questions[currentQuestion - 1];

  const handleSubmit = async () => {
  if (!answer.trim()) {
    alert("Please enter your answer first.");
    return;
  }

  setIsEvaluating(true);

  try {
    const response = await fetch("http://localhost:5000/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    });

    if (!response.ok) {
      throw new Error("Evaluation request failed.");
    }

    const data = await response.json();

    console.log("AI Evaluation:", data);

    setEvaluation(data);

    setAnswerHistory((previous) => [
      ...previous,
      {
        questionNumber: currentQuestion,
        question,
        answer,
        evaluation: data,
      },
    ]);

    setSubmitted(true);
  } catch (error) {
    console.error("Evaluation error:", error);
    alert("Could not connect to the evaluation server.");
  } finally {
    setIsEvaluating(false);
  }
};

  const handleNext = () => {
  if (currentQuestion < settings.questionCount) {
    setCurrentQuestion(currentQuestion + 1);
    setAnswer("");
    setSubmitted(false);
    setEvaluation(null);
  } else {
  const completedAnswers = [...answerHistory];

const totalScore =
  completedAnswers.length > 0
    ? completedAnswers.reduce(
        (sum, item) => sum + item.evaluation.overallScore,
        0
      ) / completedAnswers.length
    : 0;

  const completedInterview = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    role: settings.role,
    experience: settings.experience,
    interviewType: settings.interviewType,
    questionCount: settings.questionCount,
    overallScore: Number(totalScore.toFixed(1)),
    answers: completedAnswers,
  };

  const existingHistory =
    JSON.parse(localStorage.getItem("interviewHistory")) || [];

  localStorage.setItem(
    "interviewHistory",
    JSON.stringify([
      completedInterview,
      ...existingHistory,
    ])
  );

  alert("Interview completed and saved!");
}
};

  return (
    <div className="interview-page">

      {/* Header */}
      <header className="interview-header">
        <div className="interview-logo">
          <Brain size={25} />
          <span>AI Interview Coach</span>
        </div>

        <div className="interview-info">
          <span>{settings.role}</span>
          <span>•</span>
          <span>{settings.interviewType}</span>
        </div>

        <button className="exit-button" onClick={onExit}>
          Exit Interview
        </button>
      </header>

      {/* Main */}
      <main className="interview-container">

        {/* Progress */}
        <div className="progress-section">
          <div>
            <span className="question-label">
              QUESTION {currentQuestion}
            </span>

            <span className="question-total">
              / {settings.questionCount}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (currentQuestion / settings.questionCount) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">

          <div className="question-icon">
            <Brain size={28} />
          </div>

          <span className="question-type">
            AI INTERVIEWER
          </span>

          <h1>{question}</h1>

          <p className="question-hint">
            Take your time and explain your answer clearly.
          </p>

        </div>

        {/* Answer */}
        <div className="answer-section">
  <label>Your Answer</label>

  <textarea
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    placeholder="Type your answer here..."
    disabled={submitted}
  />

  <div className="answer-footer">
    <span>
      {answer.length} characters
    </span>

    {!submitted ? (
      <button
        className="submit-answer"
        onClick={handleSubmit}
        disabled={isEvaluating}
      >
        {isEvaluating ? "Evaluating..." : "Submit Answer"}
        <ArrowRight size={18} />
      </button>
    ) : (
      <button
        className="submit-answer"
        onClick={handleNext}
      >
        {currentQuestion < settings.questionCount
          ? "Next Question"
          : "Finish Interview"}
        <ArrowRight size={18} />
      </button>
    )}
  </div>
</div>

        {/* Feedback */}
        {submitted && evaluation && (
  <div className="feedback-card">
    <div className="feedback-title">
      <CheckCircle2 size={22} />
      AI Evaluation
    </div>

    <div className="feedback-items">
      <span>Relevance: {evaluation.relevance}/10</span>
      <span>Clarity: {evaluation.clarity}/10</span>
      <span>
        Technical Accuracy: {evaluation.technicalAccuracy}/10
      </span>
      <span>
        Communication: {evaluation.communication}/10
      </span>
    </div>

    <div className="feedback-placeholder">
      <strong>Overall Score: {evaluation.overallScore}/10</strong>

      <p>{evaluation.feedback}</p>
    </div>
  </div>
)}


        {/* Interview Details */}
        <div className="interview-details">

          <div>
            <Clock size={18} />
            <span>Practice Session</span>
          </div>

          <div>
            Experience: <strong>{settings.experience}</strong>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Interview;