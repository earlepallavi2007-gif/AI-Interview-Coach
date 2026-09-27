import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Clock,
  Code2,
} from "lucide-react";
import "./InterviewSetup.css";

function InterviewSetup({ onBack, onStart }) {
  const [role, setRole] = useState("Software Developer");
  const [experience, setExperience] = useState("Beginner");
  const [interviewType, setInterviewType] = useState("Technical");
  const [questionCount, setQuestionCount] = useState(5);

  const handleStart = () => {
    const interviewSettings = {
      role,
      experience,
      interviewType,
      questionCount,
    };

    console.log("Interview Settings:", interviewSettings);

    onStart(interviewSettings);
  };

  return (
    <div className="setup-page">
      <header className="setup-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="setup-logo">
          <Code2 size={24} />
          <span>AI Interview Coach</span>
        </div>
      </header>

      <main className="setup-container">
        <div className="setup-intro">
          <span className="setup-badge">INTERVIEW SETUP</span>

          <h1>Customize your interview.</h1>

          <p>
            Choose your role, experience level, and interview type.
            We'll use these preferences to create your practice session.
          </p>
        </div>

        <div className="setup-card">

          {/* Target Role */}
          <div className="form-section">
            <label>
              <Briefcase size={18} />
              Target Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Software Developer</option>
              <option>Python Developer</option>
              <option>AI / ML Engineer</option>
              <option>Data Analyst</option>
              <option>Web Developer</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="form-section">
            <label>Experience Level</label>

            <div className="option-grid three">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  className={`option ${
                    experience === level ? "active" : ""
                  }`}
                  onClick={() => setExperience(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div className="form-section">
            <label>Interview Type</label>

            <div className="option-grid three">
              {["Technical", "HR", "Mixed"].map((type) => (
                <button
                  key={type}
                  className={`option ${
                    interviewType === type ? "active" : ""
                  }`}
                  onClick={() => setInterviewType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="form-section">
            <label>
              <Clock size={18} />
              Number of Questions
            </label>

            <div className="option-grid three">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  className={`option ${
                    questionCount === count ? "active" : ""
                  }`}
                  onClick={() => setQuestionCount(count)}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Start Interview */}
          <button className="start-button" onClick={handleStart}>
            Start Interview
            <ArrowRight size={19} />
          </button>

        </div>
      </main>
    </div>
  );
}

export default InterviewSetup;