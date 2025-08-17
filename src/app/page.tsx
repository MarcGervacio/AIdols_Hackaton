"use client"

import { useState } from "react";
import { Assessment } from "./assessment";
import { Profile } from "./profile";
import { Consult } from "./consult";
import { LabTest } from "./lab-test";
import { Journey } from "./journey";

export function Header({
  isInDashboard = false,
  isInAssessment = false,
  onBackToDashboard,
  onProfile,
  onLogout,
}: {
  isInDashboard?: boolean;
  isInAssessment?: boolean;
  onBackToDashboard?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
}) {
  const handleBackToDashboard = () => {
    if (isInAssessment) {
      if (window.confirm("Are you sure you want to go back to the dashboard? Please click 'Save' first if you want to keep your changes.")) {
        if (onBackToDashboard) onBackToDashboard();
      }
    } else {
      if (onBackToDashboard) onBackToDashboard();
    }
  };

  return (
    <div className="bg-teal-500 p-5 text-lg flex relative">
      <style>
        {`
          .my-btn {
            background-color: #14b8a6;
            color: #fff;
            padding: 15px;
            margin-top: 10px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
          }
          .my-btn:hover,
          .my-btn.selected {
            background-color: #115e59;
          }
          .my-tile {
            background-color: #14b8a6;
            color: #fff;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1.25rem;
            padding: 50px;
            margin-right: 20px;
            transition: background 0.2s;
            display: inline-block;
          }
          .my-tile:hover {
            background-color: #115e59;
          }
        `}
      </style>
      <button className="my-btn" onClick={handleBackToDashboard}>TB-RAID</button>
      {isInDashboard && (
        <div className="top-buttons absolute right-0 mr-5 flex">
          <button className="my-btn mr-[10px]" onClick={onProfile}>Profile</button>
          <button className="my-btn" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export function SignIn({
  usertype,
  setUserType,
  onSignIn
}: {
  usertype: 'patient' | 'user';
  setUserType: (type: 'patient' | 'user') => void;
  onSignIn: () => void;
}) {
  return (
    <div className="text-center h-screen">
      <style>
        {`
          .my-btn {
            background-color: #14b8a6;
            color: #fff;
            padding: 15px;
            margin-top: 10px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s;
          }
          .my-btn:hover,
          .my-btn.selected {
            background-color: #115e59;
          }
        `}
      </style>
      {
        usertype === 'patient' ?
          <div className="inline-grid mt-[25vh] ml-[3vh] w-[340px]">
            <div className="inline-grid mb-[20px]">
              <label className="text-left mb-[5px]">Username</label>
              <input type="text" placeholder="Enter Username" className="p-[5px] border border-black rounded-[5px]" />
            </div>
            <div className="inline-grid">
              <label className="text-left mb-[5px]">Password</label>
              <input type="password" placeholder="Enter Password" className="p-[5px] border border-black rounded-[5px]" />
            </div>
          </div>
        :
          <div className="inline-grid mt-[25vh] ml-[3vh] w-[340px]">
            <div className="inline-grid mb-[20px]">
              <label className="text-left mb-[5px]">User ID</label>
              <input type="text" placeholder="Enter ID" className="p-[5px] border border-black rounded-[5px]" />
            </div>
            <div className="inline-grid">
              <label className="text-left mb-[5px]">Password</label>
              <input type="password" placeholder="Enter Password" className="p-[5px] border border-black rounded-[5px]" />
            </div>
          </div>
      }

      <div className="grid mt-[15px] justify-evenly ml-[25px]">
        <button className="my-btn w-[340px] w-[200px] justify-evenly" onClick={onSignIn}>Sign In</button>
        <button className="my-btn w-[340px] w-[200px] mt-[10px] justify-evenly">Sign Up</button>
      </div>
      <div className="mt-[20px]">
        <button onClick={() => setUserType('patient')} className="my-btn mr-[25px] ml-[70px] text-xl">Patient</button>
        <button onClick={() => setUserType('user')} className="my-btn mr-[50px] text-xl">User</button>
      </div>
    </div>
  );
}

export function Dashboard({
  onAssessment,
  onConsult,
  onLabTest,
  onJourney,
  consultDisabled = false,
  labTestDisabled = false,
  journeyDisabled = false
}: {
  onAssessment?: () => void;
  onConsult?: () => void;
  onLabTest?: () => void;
  onJourney?: () => void;
  consultDisabled?: boolean;
  labTestDisabled?: boolean;
  journeyDisabled?: boolean;
}) {
  return (
    <div className="text-center h-screen justify-items-center content-evenly">
      <style>
        {`
          .my-tile {
            background-color: #14b8a6;
            color: #fff;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-size: 1.25rem;
            padding: 50px;
            transition: background 0.2s;
            display: inline-block;
            opacity: 1;
          }
          .my-tile:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .my-tile:hover {
            background-color: #115e59;
          }
        `}
      </style>
      <div className="flex mb-[20px] mt-[-140px]">
        <div className="my-tile w-[210px] break-anywhere" onClick={onAssessment}>Assessment</div>
        <button
          className="my-tile w-[210px] break-anywhere"
          disabled={consultDisabled}
          onClick={onConsult}
          type="button"
        >
          Consult
        </button>
      </div>
      <div className="flex">
        <button
          className="my-tile w-[210px] break-anywhere"
          disabled={labTestDisabled}
          onClick={onLabTest}
          type="button"
        >
          Lab Test
        </button>
        <button
          className="my-tile w-[210px] break-anywhere"
          disabled={journeyDisabled}
          onClick={onJourney}
          type="button"
        >
          Journey
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [usertype, setUserType] = useState<'patient' | 'user'>('patient');
  const [isSignInClicked, setIsSignInClicked] = useState<boolean>(false);
  const [isAssessmentClicked, setIsAssessmentClicked] = useState<boolean>(false);
  const [isConsultClicked, setIsConsultClicked] = useState<boolean>(false);
  const [isLabTestClicked, setIsLabTestClicked] = useState<boolean>(false);
  const [isJourneyClicked, setIsJourneyClicked] = useState<boolean>(false);
  const [isAssessmentFinished, setIsAssessmentFinished] = useState<boolean>(false);
  const [isConsultFinished, setIsConsultFinished] = useState<boolean>(false);
  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

  // isInDashboard is true only when Dashboard is present
  const isInDashboard = isSignInClicked && !isAssessmentClicked && !isProfileClicked && !isConsultClicked;

  const isInAssessment = isAssessmentClicked && !isProfileClicked && !isConsultClicked;

  const handleSignIn = () => {
    setIsSignInClicked(true);
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
    setIsConsultClicked(false);
  };

  const handleLogout = () => {
    setIsSignInClicked(false);
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
    setIsConsultClicked(false);
  };

  const handleAssessment = () => {
    setIsAssessmentClicked(true);
    setIsLabTestClicked(false);
    setIsJourneyClicked(false);
    setIsProfileClicked(false);
    setIsConsultClicked(false);
  };

  const handleConsult = () => {
    setIsConsultClicked(true);
    setIsLabTestClicked(false);
    setIsJourneyClicked(false);
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
  };

  const handleLabTest = () => {
    setIsLabTestClicked(true);
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
    setIsConsultClicked(false);
    setIsJourneyClicked(false);
  }

  const handleJourney = () => {
    setIsJourneyClicked(true);
    setIsLabTestClicked(false);
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
    setIsConsultClicked(false);
  }

  const handleBackToDashboard = () => {
    setIsAssessmentClicked(false);
    setIsProfileClicked(false);
    setIsJourneyClicked(false);
    setIsLabTestClicked(false);
    setIsConsultClicked(false);
    setIsSignInClicked(true);
  };

  const handleConsultFinish = () => {
    setIsConsultFinished(true);
    handleBackToDashboard();
  }

  const handleProfile = () => {
    setIsProfileClicked(true);
    setIsAssessmentClicked(false);
    setIsConsultClicked(false);
  };

  // Callback for Assessment finish
  const handleAssessmentFinish = () => {
    setIsAssessmentFinished(true);
    handleBackToDashboard();
  };

  return (
    <div className="h-screen bg-white text-black">
      <Header
        isInDashboard={isInDashboard}
        isInAssessment={isInAssessment}
        onBackToDashboard={handleBackToDashboard}
        onProfile={handleProfile}
        onLogout={handleLogout}
      />
      {
        isAssessmentClicked ? (
          <Assessment
            onBackToDashboard={handleBackToDashboard}
            onFinish={handleAssessmentFinish}
          />
        ) : isProfileClicked ? (
          <Profile onBackToDashboard={handleBackToDashboard} />
        ) : isConsultClicked ? (
          <Consult onBackToDashboard={handleBackToDashboard} onConfirmSchedule={handleConsultFinish} />
        ) : isLabTestClicked ? (
          <LabTest onBackToDashboard={handleBackToDashboard} />
        ) : isJourneyClicked ? (
          <Journey onBackToDashboard={handleBackToDashboard} />
        ) : isSignInClicked ? (
          <Dashboard
            onAssessment={handleAssessment}
            onConsult={handleConsult}
            onLabTest={handleLabTest}
            onJourney={handleJourney}
            consultDisabled={!isAssessmentFinished}
            labTestDisabled={!isConsultFinished}
            journeyDisabled={!isConsultFinished}
          />
        ) : (
          <SignIn usertype={usertype} setUserType={setUserType} onSignIn={handleSignIn} />
        )
      }
    </div>
  );
}