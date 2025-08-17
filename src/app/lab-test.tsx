export function LabTest({
  onBackToDashboard
}: {
  onBackToDashboard?: () => void;
}) {
    const handleBackToDashboard = () => {
        if (onBackToDashboard) onBackToDashboard();
    };

    return (
        <div className="m-[15px]">
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
            <h2 className="text-xl font-bold mb-4">Lab Test</h2>
            <div className="mb-[15px]">
                <label className="font-bold">Attach Test Results and Recommendation Letter:</label>
                <input type="file" />
            </div>
            <div>
                <label className="font-bold">Reminders:</label>
                <p>- Kindly read our <u>Terms and Conditions</u>.</p>
                <p>- Recommedation letter attachment is required for each of the test results that you are going to attach.</p>
                <p>- Please follow this format when attaching your Recommendation letter and Test Results:</p>
                <p>- {'For Recommendation Letter: <title-of-test-result>_Recommendation Letter_<fullname>'}</p>
                <p>- {'For Test Result: <title-of-test-result>_Test Result_<fullname>'}</p>
                <button className="my-btn mt-[25px]!" onClick={handleBackToDashboard}>Back to Dashboard</button>
            </div>
        </div>
    );
}