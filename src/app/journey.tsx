export function Journey({
  onBackToDashboard
}: {
  onBackToDashboard?: () => void;
}) {
    const handleBackToDashboard = () => {
        if (onBackToDashboard) onBackToDashboard();
    };

    return (
        <div className="inline-grid mt-[50%] ml-[35%]">
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
            <button className="my-btn">Start Journey</button>
            <button className="my-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}