"use client";
import { useState } from "react";
import { Assessment } from "./assessment";

export function Header() {
  return (
    <div className="bg-blue-500 p-5 text-lg">
      <label className="text-white">TB Dots</label>
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
        <button className="w-[340px] p-[5px] w-[200px] bg-blue-500 text-white rounded-[20px] justify-evenly" onClick={onSignIn}>Sign In</button>
        <button className="w-[340px] p-[5px] w-[200px] mt-[10px] bg-blue-500 text-white rounded-[20px] justify-evenly">Sign Up</button>
      </div>
      <div className="mt-[20px]">
        <button onClick={() => setUserType('patient')} className="mr-[25px] ml-[70px] bg-blue-500 p-[30px] text-white text-xl rounded-[20px]">Patient</button>
        <button onClick={() => setUserType('user')} className="mr-[50px] bg-blue-500 p-[30px] text-white text-xl rounded-[20px]">User</button>
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
      <div className="flex mb-[20px] mt-[-140px]">
        <div className="mr-[20px] bg-blue-500 border border-[var(--color-blue-500)] p-[50px] text-white text-xl">Profile</div>
        <div className="bg-blue-500 border border-[var(--color-blue-500)] p-[50px] text-white text-xl" onClick={onConsult}>Consult</div>
      </div>
      <div className="flex">
        <div className="mr-[20px] bg-blue-500 border border-[var(--color-blue-500)] p-[50px] text-white text-xl">Results</div>
        <div className="bg-blue-500 border border-[var(--color-blue-500)] p-[50px] text-white text-xl" onClick={onLogout}>Logout</div>
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