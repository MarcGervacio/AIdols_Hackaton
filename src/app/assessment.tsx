import { useState } from "react";

const assessmentQuestions = [
  { question: "Persistent cough? (=> 2 weeks)" },
  { question: "Cough with phlegm or sputum?" },
  { question: "Blood-streaked sputum (hemoptysis)?" },
  { question: "Chest pain during coughing/breathing?" },
  { question: "Shortness of breath?" }
];

// Store answers outside the component to persist across unmounts/remounts
let savedAnswers: (boolean | null)[] = Array(assessmentQuestions.length).fill(null);

export function Assessment({
  onBackToDashboard
}: {
  onBackToDashboard?: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(boolean | null)[]>([...savedAnswers]);

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setIsNextClicked(false);
    }
  };

  const handleFirstNext = () => {
    setIsNextClicked(true);
  };

  const answerSelected = answers[currentQuestion] !== null;

  const handleAnswer = (ans: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = ans;
    setAnswers(newAnswers);
  };

  // Save answers to the persistent variable
  const handleSave = () => {
    savedAnswers = [...answers];
    alert("Answers saved!");
  };

  // Clear only the current question's answer
  const handleClear = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = null;
    setAnswers(newAnswers);
  };

  // Clear all answers with confirmation
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all answers? This cannot be undone.")) {
      const cleared = Array(assessmentQuestions.length).fill(null);
      setAnswers(cleared);
    }
  };

  // Confirm before leaving to dashboard
  const handleBackToDashboard = () => {
    if (window.confirm("Are you sure you want to go back to the dashboard? Please click 'Save' first if you want to keep your changes.")) {
      if (onBackToDashboard) onBackToDashboard();
    }
  };

  return (
    <div style={{ minHeight: "100vh", boxSizing: "border-box", padding: "0 8px" }}>
      <style>
        {`
          .my-btn {
            background-color: #14b8a6;
            color: #fff;
            padding: 12px 18px;
            margin-right: 10px;
            margin-bottom: 10px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
            min-width: 120px;
            max-width: 100vw;
            word-break: break-word;
          }
          .my-btn:hover,
          .my-btn.selected {
            background-color: #115e59;
          }
          .btn-toolbar, .btn-nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
          }
          .btn-toolbar {
            margin-top: 20px;
            margin-bottom: 0;
          }
          .btn-nav {
            margin-top: 0;
            margin-bottom: 30px;
          }
          @media (max-width: 600px) {
            .my-btn {
              min-width: 90px;
              font-size: 0.95rem;
              padding: 10px 8px;
            }
          }
        `}
      </style>
      {/* Toolbar at the top, after header */}
      <div className="btn-toolbar">
        <button onClick={handleSave} className="my-btn" type="button">Save</button>
        <button onClick={handleClear} className="my-btn" type="button">Clear</button>
        <button onClick={handleClearAll} className="my-btn" type="button">Clear All</button>
        <button onClick={handleBackToDashboard} className="my-btn" type="button">Back to Dashboard</button>
        {!isNextClicked && (
          <button onClick={handleFirstNext} className="my-btn" type="button">Start Assessment</button>
        )}
      </div>
      {/* Navigation buttons below toolbar */}
      {isNextClicked && (
        <div className="btn-nav">
          <button
            onClick={handlePrevious}
            className="my-btn"
            type="button"
            disabled={currentQuestion === 0 && !isNextClicked}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="my-btn"
            type="button"
            disabled={!answerSelected || currentQuestion === assessmentQuestions.length}
            style={
              (!answerSelected || currentQuestion === assessmentQuestions.length)
                ? { opacity: 0.5, cursor: "not-allowed" }
                : {}
            }
          >
            Next
          </button>
        </div>
      )}
      {isNextClicked ? (
        <div
          className="text-center h-screen justify-items-center content-evenly"
          style={{ paddingTop: 0, marginTop: "-181px" }}
        >
          {currentQuestion === assessmentQuestions.length ? (
            <div>
              <h1>Thank you for completing the assessment!</h1>
              <button
                className="my-btn"
                type="button"
                onClick={() => {
                  savedAnswers = [...answers];
                  alert("All answers are saved");
                  alert("We will review all of your answers and email you for the next steps after the review. Thank you.");
                  if (onBackToDashboard) onBackToDashboard();
                }}
              >
                Finish
              </button>
            </div>
          ) : (
            <div>
              <div>Question #{currentQuestion + 1}: {assessmentQuestions[currentQuestion].question}</div>
              <div>
                <button
                  className={`my-btn${answers[currentQuestion] === true ? " selected" : ""}`}
                  onClick={() => handleAnswer(true)}
                  type="button"
                >
                  Yes
                </button>
                <button
                  className={`my-btn${answers[currentQuestion] === false ? " selected" : ""}`}
                  onClick={() => handleAnswer(false)}
                  type="button"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="text-center h-screen justify-items-center content-evenly"
          style={{ marginTop: "-140px" }} // Reduce top space for Agreement Policy
        >
          <h1>Agreement Policy</h1>
          <p className="overflow-y-auto h-[60%]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
      )}
    </div>
  );
}