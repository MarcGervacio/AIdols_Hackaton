import { useState } from "react";
import { assessmentQuestions, savedAnswers } from "./assessment";

export function generateTestResult(answers: (boolean | null)[]) {
  let totalCriticality = 0;

  // Gather results for each question
  const results = assessmentQuestions.map((q, idx) => ({
    question: q.question,
    answer: answers[idx] === true ? "Yes" : answers[idx] === false ? "No" : "Unanswered",
    criticalityLevel: q.criticalityLevel
  }));

  assessmentQuestions.map((q) => (
    totalCriticality += q.criticalityLevel
  ));

  // Calculate average criticality for 'Yes' answers
  const yesCriticalities = assessmentQuestions
    .map((q, idx) => answers[idx] === true ? q.criticalityLevel : null)
    .filter((v) => v !== null) as number[];

  const averageCriticality =
    yesCriticalities.length > 0
      ? Math.round((yesCriticalities.reduce((a, b) => a + b, 0) / totalCriticality) * 100)
      : 0;

  // Determine final result
  const finalResult =
    averageCriticality >= 60 && averageCriticality <= 100
      ? "Positive"
      : "Negative";

  return {
    questions: results,
    averageCriticality,
    finalResult
  };
}

// Sample output:
/*
{
  questions: [
    { question: "Persistent cough? (=> 2 weeks)", answer: "Yes", criticalityLevel: 20 },
    { question: "Cough with phlegm or sputum?", answer: "No", criticalityLevel: 10 },
    ...
  ],
  averageCriticality: 65,
  finalResult: "Positive"
}
*/

export function Consult({
  onBackToDashboard,
  onConfirmSchedule
}: {
  onBackToDashboard?: () => void;
  onConfirmSchedule?: () => void;
}) {
    const [isTestResultClicked, setIsTestResultClicked] = useState<boolean>(true);
    const [isScheduleAppointmentClicked, setIsScheduleAppointmentClicked] = useState<boolean>(false);
    const [isScheduleSelectedClicked, setIsScheduleSelectedClicked] = useState<boolean>(false);
    const [isSchedule, setIsSchedule] = useState<any>({});

    const handleBackToDashboard = () => {
        setIsTestResultClicked(false);
        if (onBackToDashboard) onBackToDashboard();
    };

    const handleConfirmSchedule = () => {
        setIsTestResultClicked(false);
        if (onConfirmSchedule) onConfirmSchedule();
    };

    const handleScheduleAppointment = () => {
        setIsTestResultClicked(false);
        setIsScheduleAppointmentClicked(true);
    };

    const handleScheduleSelected = (schedule: any) => {
        setIsSchedule(schedule);
        setIsTestResultClicked(false);
        setIsScheduleAppointmentClicked(false);
        setIsScheduleSelectedClicked(true);
    };

    return (
        <div>
            {
                isTestResultClicked ? (
                    <TestResults
                        onBackToDashboard={handleBackToDashboard}
                        onScheduleAppointment={handleScheduleAppointment}
                    />
                ) : isScheduleAppointmentClicked ? (
                    <ReserveAppointment
                        onBackToDashboard={handleBackToDashboard}
                        onScheduleSelected={handleScheduleSelected}
                    />
                ) : isScheduleSelectedClicked ? (
                    <AppointmentSummary selectedSchedule={isSchedule} onBackToDashboard={handleBackToDashboard} onConfirmSchedule={handleConfirmSchedule} />
                ): (
                    <div></div>
                )
            }
        </div>
    );
}

export function TestResults({
  onBackToDashboard,
  onScheduleAppointment
}: {
  onBackToDashboard?: () => void;
  onScheduleAppointment?: () => void;
}) {
  // Get the test result using the saved answers from assessment.tsx
  const testResult = generateTestResult(savedAnswers);
  
  const handleBackToDashboard = () => {
    if (onBackToDashboard) onBackToDashboard();
  };

  const handleScheduleAppointment = () => {
    if (onScheduleAppointment) onScheduleAppointment();
  }

  return (
    <div className="p-6">
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
        `}
      </style>
      <h2 className="text-xl font-bold mb-4">Assessment Results</h2>
      <div className="mb-2">
        <strong>Average Criticality:</strong> {testResult.averageCriticality}%
      </div>
      <div className="mb-2">
        <strong>Final Result:</strong> {testResult.finalResult}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Answers:</h3>
        <ul>
          {testResult.questions.map((q, idx) => (
            <li key={idx} className="mb-1">
              <span className="font-medium">{q.question}</span>
              <span> — <strong>{q.answer}</strong> (Criticality: {q.criticalityLevel})</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <button className="my-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>
        {
            testResult.finalResult === "Positive" && (
                <button className="my-btn" onClick={handleScheduleAppointment}>Schedule Appointment</button>
            )
        }
      </div>
    </div>
  );
}

export function ReserveAppointment({
  onBackToDashboard,
  onScheduleSelected
}: {
  onBackToDashboard?: () => void;
  onScheduleSelected?: (schedule: any) => void;
}) {
    const handleBackToDashboard = () => {
        if (onBackToDashboard) onBackToDashboard();
    };

    const handleScheduleSelected = (schedule: any) => {
        if (onScheduleSelected) onScheduleSelected(schedule);
    };

    return (
        <div className="ml-[10px] mr-[10px]">
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
                .address-label {
                    font-weight: bold;
                }
                `}
            </style>
            <h2 className="text-xl font-bold mb-4 mt-[10px]">Reserve Appointment</h2>
            <p className="mb-4">Select your preferred Physician, place, and schedule from the list below. If your preferred Physician/place/schedule is not available on the list below. Feel free to contact your healthcare provider to schedule an appointment.</p>
            <div>
                <div className="border-b border-black mb-4 pb-2">
                    <label>Dr. FirstSampleFirstname FirstSampleLastname</label>
                    <div>
                        <label className="address-label">Address:</label>
                        <p>123 FirstSample St. FirstSampleTown FirstSampleCity</p>
                    </div>
                    <div>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. FirstSampleFirstname FirstSampleLastname",
                                address: "123 FirstSample St. FirstSampleTown FirstSampleCity",
                                date: "January 1, 2025",
                                time: "7:00AM"
                            }
                        )}>January 1, 2025 - 7:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. FirstSampleFirstname FirstSampleLastname",
                                address: "123 FirstSample St. FirstSampleTown FirstSampleCity",
                                date: "January 1, 2025",
                                time: "10:00AM"
                            }
                        )}>January 1, 2025 - 10:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. FirstSampleFirstname FirstSampleLastname",
                                address: "123 FirstSample St. FirstSampleTown FirstSampleCity",
                                date: "January 1, 2025",
                                time: "2:00PM"
                            }
                        )}>January 1, 2025 - 2:00PM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. FirstSampleFirstname FirstSampleLastname",
                                address: "123 FirstSample St. FirstSampleTown FirstSampleCity",
                                date: "January 1, 2025",
                                time: "5:00PM"
                            }
                        )}>January 1, 2025 - 5:00PM</button>
                    </div>
                </div>
                <div className="border-b border-black mb-4 pb-2">
                    <label>Dr. SecondSampleFirstname SecondSampleLastname</label>
                    <div>
                        <label className="address-label">Address:</label>
                        <p>123 SecondSample St. SecondSampleTown SecondSampleCity</p>
                    </div>
                    <div>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. SecondSampleFirstname SecondSampleLastname",
                                address: "123 SecondSample St. SecondSampleTown SecondSampleCity",
                                date: "February 7, 2025",
                                time: "7:00AM"
                            }
                        )}>February 7, 2025 - 7:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. SecondSampleFirstname SecondSampleLastname",
                                address: "123 SecondSample St. SecondSampleTown SecondSampleCity",
                                date: "February 7, 2025",
                                time: "10:00AM"
                            }
                        )}>February 7, 2025 - 10:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. SecondSampleFirstname SecondSampleLastname",
                                address: "123 SecondSample St. SecondSampleTown SecondSampleCity",
                                date: "February 7, 2025",
                                time: "2:00PM"
                            }
                        )}>February 7, 2025 - 2:00PM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. SecondSampleFirstname SecondSampleLastname",
                                address: "123 SecondSample St. SecondSampleTown SecondSampleCity",
                                date: "February 7, 2025",
                                time: "5:00PM"
                            }
                        )}>February 7, 2025 - 5:00PM</button>
                    </div>
                </div>
                <div className="border-b border-black mb-4 pb-2">
                    <label className="address-label">Dr. ThirdSampleFirstname ThirdSampleLastname</label>
                    <div>
                        <label>Address:</label>
                        <p>123 ThirdSample St. ThirdSampleTown ThirdSampleCity</p>
                    </div>
                    <div>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. ThirdSampleFirstname ThirdSampleLastname",
                                address: "123 ThirdSample St. ThirdSampleTown ThirdSampleCity",
                                date: "February 20, 2025",
                                time: "7:00AM"
                            }
                        )}>February 20, 2025 - 7:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. ThirdSampleFirstname ThirdSampleLastname",
                                address: "123 ThirdSample St. ThirdSampleTown ThirdSampleCity",
                                date: "February 20, 2025",
                                time: "10:00AM"
                            }
                        )}>February 20, 2025 - 10:00AM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. ThirdSampleFirstname ThirdSampleLastname",
                                address: "123 ThirdSample St. ThirdSampleTown ThirdSampleCity",
                                date: "February 20, 2025",
                                time: "2:00PM"
                            }
                        )}>February 20, 2025 - 2:00PM</button>
                        <button className="my-btn" onClick={() => handleScheduleSelected(
                            {
                                physician: "Dr. ThirdSampleFirstname ThirdSampleLastname",
                                address: "123 ThirdSample St. ThirdSampleTown ThirdSampleCity",
                                date: "February 20, 2025",
                                time: "5:00PM"
                            }
                        )}>February 20, 2025 - 5:00PM</button>
                    </div>
                </div>
            </div>
            <button className="my-btn mt-[0px]!" onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}

export function AppointmentSummary({
  selectedSchedule,
  onBackToDashboard,
  onConfirmSchedule
}: {
  selectedSchedule: any;
  onBackToDashboard?: () => void;
  onConfirmSchedule?: () => void;
}) {
    const handleBackToDashboard = () => {
        if (window.confirm("Are you sure you want to go back to the dashboard? You change might not be saved.")) {
            if (onBackToDashboard) onBackToDashboard();
        }
    };

    
    const handleConfirmSchedule = () => {
        if (window.confirm("Appointment Schedule saved. See you there.")) {
            if (onConfirmSchedule) onConfirmSchedule();
        }
    };

    return (
        <div className="mr-[10px] ml-[10px]">
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
                    label {
                        font-weight: bold;
                        margin-right: 5px;
                    }
                `}
            </style>
            <h2 className="text-xl font-bold mb-4 mt-[10px]">Appointment Summary</h2>
            <div>
                <div className="flex">
                    <label>Physician:</label>
                    <p>{selectedSchedule.physician}</p>
                </div>
                <div className="flex">
                    <label>Address:</label>
                    <p>{selectedSchedule.address}</p>
                </div>
                <div className="flex">
                    <label>Date:</label>
                    <p>{selectedSchedule.date}</p>
                </div>
                <div className="flex">
                    <label>Time:</label>
                    <p>{selectedSchedule.time}</p>
                </div>
            </div>
            <div className="mt-[10px]">
                <label>Reminders:</label>
                <p>A separate confirmation email will be sent to your email. Make sure to present that email to the helpdesk on day of your appointment. Come to your appointment 5 minutes early to your schedule, for the convenience if any issue/s that might occur. You may reach out to our hotline for any changes that you want to make on your schedule.</p>
            </div>
            <div className="mt-[10px]">
                <button className="my-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>
                <button className="my-btn" onClick={handleConfirmSchedule}>Confirm Schedule</button>
            </div>
        </div>
    )
}