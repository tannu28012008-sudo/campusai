import { useState } from "react";

function AIPage({ onBack }) {
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const askCampusAI = () => {
    const text = question.trim();

    if (!text || isThinking) return;

    setChatMessages((current) => [
      ...current,
      { role: "user", text },
    ]);

    setQuestion("");
    setIsThinking(true);

    setTimeout(() => {
      let answer =
        "I couldn't find this information in the available campus notices.";

      const lower = text.toLowerCase();

      if (lower.includes("exam") || lower.includes("examination")) {
        answer =
          "The Semester Examination Schedule has been released. Please check your examination schedule. The current notice shows a deadline of 20 September 2026.";
      } else if (
        lower.includes("assignment") ||
        lower.includes("deadline")
      ) {
        answer =
          "Your assignment submission deadline is 18 September 2026. Please submit your assignment before the deadline.";
      } else if (
        lower.includes("coding") ||
        lower.includes("club")
      ) {
        answer =
          "The Campus Coding Club Meetup is scheduled for 19 September 2026. You can view the details from the campus updates.";
      }

      setChatMessages((current) => [
        ...current,
        { role: "ai", text: answer },
      ]);

      setIsThinking(false);
    }, 1200);
  };

  const askSuggestedQuestion = (text) => {
    setQuestion(text);
  };

  return (
    <main className="ai-page">

      <button
        className="ai-back-button"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      <div className="ai-page-header">
        <div className="ai-page-icon">✦</div>

        <span>ASK CAMPUSAI</span>

        <h1>How can I help you?</h1>

        <p>
          Ask anything about your campus information.
        </p>
      </div>

      <div className="ai-question-box">

        <input
          className="ai-question-input"
          type="text"
          placeholder="Ask something like “When is my exam?”"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askCampusAI();
            }
          }}
        />

        <button
          className="ai-ask-button"
          onClick={askCampusAI}
          disabled={!question.trim() || isThinking}
        >
          {isThinking ? "Thinking..." : "Ask →"}
        </button>

      </div>

      {chatMessages.length === 0 && !isThinking && (
        <div className="ai-suggestions">

          <span>Try asking</span>

          <button
            onClick={() =>
              askSuggestedQuestion("When is my exam?")
            }
          >
            When is my exam?
          </button>

          <button
            onClick={() =>
              askSuggestedQuestion(
                "What is my assignment deadline?"
              )
            }
          >
            Assignment deadline?
          </button>

          <button
            onClick={() =>
              askSuggestedQuestion(
                "What's happening on campus?"
              )
            }
          >
            What's happening on campus?
          </button>

        </div>
      )}

      {chatMessages.length > 0 && (
        <div className="ai-chat">

          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`ai-message ${
                message.role === "user"
                  ? "user-message"
                  : "ai-message-bubble"
              }`}
            >
              {message.role === "ai" && (
                <div className="message-ai-icon">
                  ✦
                </div>
              )}

              <div className="message-content">
                <span>
                  {message.role === "user"
                    ? "You"
                    : "CampusAI"}
                </span>

                <p>{message.text}</p>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="ai-message ai-message-bubble">

              <div className="message-ai-icon">
                ✦
              </div>

              <div className="thinking-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>

            </div>
          )}

        </div>
      )}

    </main>
  );
}

export default AIPage;
