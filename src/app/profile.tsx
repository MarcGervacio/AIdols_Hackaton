export function Profile({
  onBackToDashboard
}: {
  onBackToDashboard?: () => void;
}) {
  const handleBackToDashboard = () => {
    if (onBackToDashboard) onBackToDashboard();
  };

  return (
    <div className="text-center justify-items-center mt-[30%]">
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

          label {
            font-weight: bold;
          }

          .details-container {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
        `}
      </style>
      <div className="bg-[#00bba7] h-[150px] w-[150px] mb-[15px] rounded-full"></div>
      <button className="my-btn mr-[10px]">Edit Profile</button>
      <button className="my-btn mr-[10px]">Change Username/Password</button>
      <button className="my-btn"  onClick={handleBackToDashboard}>Back to Dashboard</button>
      <div className="mt-[20px] mr-[10px] ml-[10px]">
        <div className="details-container">
          <label>Name:</label>
          SampleFirstname SampleLastname
        </div>
        <div className="details-container">
          <label>Address:</label>
          123 Sample Street, Sample City, Sample State, 12345
        </div>
        <div className="details-container">
          <label>Email:</label>
          sampleemail123@sample.com
        </div>
        <div className="details-container">
          <label>Phone Number:</label>
          0912-345-6789
        </div>
      </div>
    </div>
  )  
}
