"use client";
import { useState } from "react";
import { Assessment } from "./assessment";

export function Header() {
  const [isSignInClicked, setIsSignInClicked] = useState<boolean>(false);
  const [isConsultClicked, setIsConsultClicked] = useState<boolean>(false);
  const handleBackToDashboard = () => {
    setIsConsultClicked(false);
    setIsSignInClicked(true);
  };

  return (
    <div className="bg-teal-500 p-5 text-lg">
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
      <button className="my-btn" onClick={handleBackToDashboard}>TB Dots</button>
    </div>
  )
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
  onLogout,
  onConsult
}: {
  onLogout?: () => void;
  onConsult?: () => void;  
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
          }
          .my-tile:hover {
            background-color: #115e59;
          }
        `}
      </style>
      <div className="flex mb-[20px] mt-[-140px]">
        <div className="my-tile">Profile</div>
        <div className="my-tile" onClick={onConsult}>Consult</div>
      </div>
      <div className="flex">
        <div className="my-tile">Results</div>
        <div className="my-tile" onClick={onLogout}>Logout</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [usertype, setUserType] = useState<'patient' | 'user'>('patient');
  const [isSignInClicked, setIsSignInClicked] = useState<boolean>(false);
  const [isConsultClicked, setIsConsultClicked] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsSignInClicked(true);
  };

  const handleLogout = () => {
    setIsSignInClicked(false);
  };

  const handleConsult = () => {
    setIsConsultClicked(true);
  };

  const handleBackToDashboard = () => {
    setIsConsultClicked(false);
    setIsSignInClicked(true);
  };

  return (
    <div className="h-screen bg-white text-black">
      <Header />
      {
        isConsultClicked ? (
          <Assessment onBackToDashboard={handleBackToDashboard} />
        ) : isSignInClicked ? (
          <Dashboard onLogout={handleLogout} onConsult={handleConsult} />
        ) : (
          <SignIn usertype={usertype} setUserType={setUserType} onSignIn={handleSignIn} />
        )
      }
    </div>
  );
}