import React from "react";
import InterviewSetup from "./InterviewSetup";
import Interview from "./Interview";
import InterviewHistory from "./InterviewHistory";
import {
  ArrowRight,
  Brain,
  Mic,
  BarChart3,
  Target,
  CheckCircle2,
} from "lucide-react";
import "./App.css";

function App() {
   const [showSetup, setShowSetup] = React.useState(false);
   const [showInterview, setShowInterview] = React.useState(false);
   const [interviewSettings, setInterviewSettings] = React.useState(null);
   const [showHistory, setShowHistory] = React.useState(false);

  if (showInterview) {
  return (
    <Interview
      settings={interviewSettings}
      onExit={() => {
        setShowInterview(false);
        setShowSetup(true);
      }}
    />
  );
}

if (showSetup) {
  return (
    <InterviewSetup
      onBack={() => setShowSetup(false)}
      onStart={(settings) => {
        console.log("Starting interview with:", settings);

        setInterviewSettings(settings);
        setShowInterview(true);
      }}
    />
  );
}

if (showHistory) {
  return (
    <InterviewHistory
      onBack={() => setShowHistory(false)}
    />
  );
}
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <Brain size={28} />
          <span>AI Interview Coach</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="login-btn">Login</button>
          <button className="primary-btn small">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="badge">
              <span>✦</span>
              AI-Powered Interview Preparation
            </div>

            <h1>
              Ace Your Next Interview.
            </h1>

            <p>
              Practice realistic interviews with your personal AI coach.
              Get instant feedback, discover your weak areas, and improve
              your interview skills with every session.
            </p>

            <div className="hero-buttons">
              <button
                       className="primary-btn"
            onClick={() => setShowSetup(true)}
            >  
              Start Interview
             <ArrowRight size={19} />
              </button>

              <button className="secondary-btn">
                Explore Features
              </button>
            </div>

            <button onClick={() => setShowHistory(true)}>
             View Interview History
            </button>

            <div className="trust">
              <CheckCircle2 size={18} />
              <span>Practice anytime • Improve continuously</span>
            </div>
          </div>

          {/* Interview Preview */}
          <div className="hero-card">
            <div className="card-header">
              <div>
                <span className="card-label">LIVE INTERVIEW</span>
                <h3>Software Developer</h3>
              </div>

              <div className="status">
                <span></span>
                AI Ready
              </div>
            </div>

            <div className="question-box">
              <span>Question 03</span>
              <h3>
                Explain the difference between a stack and a queue.
              </h3>
            </div>

            <div className="progress-info">
              <span>Interview Progress</span>
              <span>3 / 10</span>
            </div>

            <div className="progress-bar">
              <div></div>
            </div>

            <div className="card-footer">
              <div className="mini-stat">
                <Target size={18} />
                <div>
                  <strong>82%</strong>
                  <span>Performance</span>
                </div>
              </div>

              <div className="mini-stat">
                <Mic size={18} />
                <div>
                  <strong>Voice</strong>
                  <span>Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" id="features">
          <div className="section-heading">
            <span>POWERFUL FEATURES</span>
            <h2>Everything you need to interview better.</h2>
            <p>
              A smarter way to prepare for technical and HR interviews.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-box">
                <Brain size={25} />
              </div>
              <h3>AI-Powered Questions</h3>
              <p>
                Get personalized questions based on your role, skills,
                experience, and interview type.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <Target size={25} />
              </div>
              <h3>Instant Feedback</h3>
              <p>
                Understand your answer quality with detailed AI-generated
                feedback and scoring.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <Mic size={25} />
              </div>
              <h3>Voice Interviews</h3>
              <p>
                Practice speaking naturally with realistic voice-based
                interview sessions.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">
                <BarChart3 size={25} />
              </div>
              <h3>Performance Analytics</h3>
              <p>
                Track your progress, identify weak topics, and see how your
                performance improves over time.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="about">
          <div>
            <span>READY TO PRACTICE?</span>
            <h2>Your next interview starts here.</h2>
            <p>
              Practice smarter. Learn from every answer. Build confidence.
            </p>
          </div>

          <button className="primary-btn">
            Start Practicing
            <ArrowRight size={19} />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="logo">
          <Brain size={22} />
          <span>AI Interview Coach</span>
        </div>

        <p>AI-powered interview preparation platform.</p>
      </footer>
    </div>
  );
}

export default App;