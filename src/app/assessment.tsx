"use client";

import { useState } from "react";

const assessmentQuestions = [
  {
    question: "Persistent cough? (=> 2 weeks)"
  },
  {
    question: "Cough with phlegm or sputum?"
  },
  {
    question: "Blood-streaked sputum (hemoptysis)?"
  },
  {
    question: "Chest pain during coughing/breathing?"
  },
  {
    question: "Shortness of breath?"
  }
];

export function Assessment({
  onBackToDashboard
}: {
  onBackToDashboard?: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const handleNext = () => {
    if (currentQuestion <= assessmentQuestions.length) {
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

  return (
    <div>
      {
        isNextClicked ? (
          <div className="text-center h-screen justify-items-center content-evenly">
            {
              (currentQuestion === assessmentQuestions.length) ? (
                <h1>Thank you for completing the assessment!</h1>
              ) : (
                <div>
                  <div>Question #{currentQuestion + 1}: {assessmentQuestions[currentQuestion].question}</div>
                  <div>
                    <button className="cursor-pointer hover:bg-teal-600 mt-[10px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Yes</button>
                    <button className="cursor-pointer hover:bg-teal-600 mt-[10px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">No</button>
                  </div>
                </div>
              )
            }
            <Navigation onNextQuestion={handleNext} onPreviousQuestion={handlePrevious} onBackToDashboard={onBackToDashboard} isInAgreementPolicy={currentQuestion === assessmentQuestions.length} isAssessmentCompleted={currentQuestion === assessmentQuestions.length} />
          </div>
        ) : (
          <div className="text-center h-screen justify-items-center content-evenly">
            <h1>Agreement Policy</h1>
            <p className="overflow-y-auto h-[70%]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
            <Navigation onNextQuestion={handleFirstNext} onBackToDashboard={onBackToDashboard} isInAgreementPolicy={true} isAssessmentCompleted={false} />
          </div>
        )
      }
    </div>
  )
}

export function Navigation({
  isInAgreementPolicy = false,
  isAssessmentCompleted = false,
  onPreviousQuestion,
  onNextQuestion,
  onBackToDashboard
}: {
  isInAgreementPolicy: boolean;
  isAssessmentCompleted: boolean
  onPreviousQuestion?: () => void;
  onNextQuestion?: () => void;
  onBackToDashboard?: () => void;
}) {
  return (
    <div>
      {
        !isInAgreementPolicy ? (
          <div>
            <button onClick={onPreviousQuestion} className="cursor-pointer hover:bg-teal-600 mt-[30px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Previous</button>
            <button onClick={onNextQuestion} className="cursor-pointer hover:bg-teal-600 mt-[30px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Next</button>
            <button onClick={onBackToDashboard} className="hover:bg-teal-600 mt-[30px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Back to Dashboard</button>
          </div>
        ) : isAssessmentCompleted ? (
          <div>
            <button onClick={onPreviousQuestion} className="cursor-pointer hover:bg-teal-600 mt-[10px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Previous</button>
            <button className="cursor-pointer hover:bg-teal-600 mt-[10px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Finish</button>
            <button onClick={onBackToDashboard} className="hover:bg-teal-600 mt-[10px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Back to Dashboard</button>
          </div>
        ) : (
          <div>
            <button onClick={onNextQuestion} className="cursor-pointer hover:bg-teal-600 mt-[10px] mr-[15px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Next</button>
            <button onClick={onBackToDashboard} className="hover:bg-teal-600 mt-[10px] bg-teal-500 p-[15px] text-white text-m rounded-[20px]">Back to Dashboard</button>
          </div>
        )
      }
    </div>
  )
}
