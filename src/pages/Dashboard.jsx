import { useRef, useState } from "react";
import AIPage from "./AIPage";

function Dashboard() {
  const updatesRef = useRef(null);
  const [saved, setSaved] = useState([]);
  const [viewMode, setViewMode] = useState("day");
  const [showSaved, setShowSaved] = useState(false);
  const [sourceNotice, setSourceNotice] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);


  const askCampusAI = () => {
    const text = question.trim();

    if (!text || isThinking) return;

    setChatMessages((current) => [
      ...current,
      {
        role: "user",
        text,
      },
    ]);

    setQuestion("");
    setIsThinking(true);

    setTimeout(() => {
      let answer =
        "I couldn't find this information in the available campus notices.";

      const lower = text.toLowerCase();

      if (
        lower.includes("exam") ||
        lower.includes("examination")
      ) {
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
        {
          role: "ai",
          text: answer,
        },
      ]);

      setIsThinking(false);
    }, 1200);
  };

  const askSuggestedQuestion = (text) => {
    setQuestion(text);

    setTimeout(() => {
      const input = document.querySelector(".ai-question-input");
      input?.focus();
    }, 50);
  };
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [dashboardPage, setDashboardPage] = useState("home");
  const toggleReminder = (id) => {
    setReminders((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  const notices = [
    {
      id: 1,
      priority: "URGENT",
      title: "Semester Examination Schedule Released",
      text: "The end-semester examination schedule has been published. Check your subjects and plan accordingly.",
      deadline: "20 September 2026",
      action: "Check Schedule",
      type: "urgent",
      reason:
        "You're seeing this because this examination update applies to your current year and department.",
    },
    {
      id: 2,
      priority: "IMPORTANT",
      title: "Assignment Submission Reminder",
      text: "Your Data Structures assignment submission deadline is approaching.",
      deadline: "18 September 2026",
      action: "Submit Assignment",
      type: "important",
      reason:
        "You're seeing this because this assignment is relevant to your current course.",
    },
    {
      id: 3,
      priority: "GENERAL",
      title: "Campus Coding Club Meetup",
      text: "The Coding Club is hosting a campus meetup this Friday for students interested in technology.",
      deadline: "19 September 2026",
      action: "View Details",
      type: "general",
      reason:
        "You're seeing this because you're interested in technology and campus activities.",
    },
  ];
  const noticesToShow = showSaved
    ? notices.filter((notice) => saved.includes(notice.id))
    : notices;
  const filteredNotices = noticesToShow.filter((notice) => {
    const matchesSearch =
      `${notice.title} ${notice.text} ${notice.action}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || notice.type === filter;

    return matchesSearch && matchesFilter;
  });
  const toggleSave = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  if (dashboardPage === "ai") {
  return (
    <AIPage
      onBack={() => setDashboardPage("home")}
    />
  );
}
  return (
    <div className="campus-dashboard">

      {/* HEADER */}
      <header className="dashboard-topbar">
        <div className="dashboard-logo">
          Campus<span>AI</span>
        </div>

        <div className="student-profile">
          <div className="profile-avatar">S</div>
          <div>
            <strong>Student</strong>
            <small>Computer Science • 2nd Year</small>
          </div>
        </div>
      </header>


      {/* WELCOME */}
      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">YOUR PERSONAL CAMPUS</span>

          <h1>
            Good Morning, <span>Student</span> 👋
          </h1>

          <p>
            Here’s what needs your attention today.
          </p>
        </div>

        <button
          className="ask-ai-button"
          onClick={() => setDashboardPage("ai")}
        >
          ✨ Ask CampusAI
        </button>
      </section>
      <div className="day-week-toggle">
        <button
          className={viewMode === "day" ? "active" : ""}
          onClick={() => setViewMode("day")}
        >
          My Day
        </button>

        <button
          className={viewMode === "week" ? "active" : ""}
          onClick={() => setViewMode("week")}
        >
          My Week
        </button>
      </div>
      <div className="day-week-content">
        {viewMode === "day" ? (
          <>
            <div className="glance-header">
              <div>
                <span className="section-eyebrow">TODAY</span>
                <h2>Today at a Glance</h2>
                <p>Here’s what needs your attention right now.</p>
              </div>
            </div>

            <div className="glance-grid">

              {/* URGENT */}
              <div
                className="glance-card urgent"
                onClick={() => {
                  setFilter("urgent");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">!</div>

                <div className="glance-info">
                  <span>URGENT</span>
                  <strong>
                    {notices.filter((notice) => notice.type === "urgent").length}
                  </strong>
                  <p>Needs your attention</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* DEADLINES */}
              <div
                className="glance-card deadline"
                onClick={() => {
                  setFilter("all");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">◷</div>

                <div className="glance-info">
                  <span>DEADLINES</span>
                  <strong>
                    {
                      notices.filter(
                        (notice) => notice.deadline && notice.type !== "general"
                      ).length
                    }
                  </strong>
                  <p>Upcoming deadlines</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* MISSED */}
              <div
                className="glance-card missed"
                onClick={() => {
                  setFilter("important");
                  setShowSaved(false);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">◌</div>

                <div className="glance-info">
                  <span>MISSED</span>
                  <strong>1</strong>
                  <p>Important update</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>


              {/* SAVED */}
              <div
                className="glance-card saved"
                onClick={() => {
                  setShowSaved(true);

                  setTimeout(() => {
                    updatesRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 100);
                }}
              >
                <div className="glance-icon">★</div>

                <div className="glance-info">
                  <span>SAVED</span>
                  <strong>{saved.length}</strong>
                  <p>Your saved notices</p>
                </div>

                <div className="glance-arrow">→</div>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="glance-header">
              <div>
                <span className="section-eyebrow">THIS WEEK</span>
                <h2>This Week</h2>
                <p>Important updates and upcoming deadlines.</p>
              </div>
            </div>

            <div className="week-summary">
              <div>
                <strong>{notices.length}</strong>
                <span>Updates</span>
              </div>

              <div>
                <strong>
                  {notices.filter((notice) => notice.deadline).length}
                </strong>
                <span>Deadlines</span>
              </div>

              <div>
                <strong>{saved.length}</strong>
                <span>Saved</span>
              </div>
            </div>
          </>
        )}
      </div>


      {/* STATS */}
      <section className="dashboard-stats">

        <div className="dashboard-stat"
        >
          <div className="stat-icon">!</div>
          <div>
            <strong>01</strong>
            <span>Urgent</span>
          </div>
        </div>

        <div className="dashboard-stat">
          <div className="stat-icon">◷</div>
          <div>
            <strong>02</strong>
            <span>Deadlines</span>
          </div>
        </div>

        <div className="dashboard-stat">
          <div className="stat-icon">✦</div>
          <div>
            <strong>04</strong>
            <span>New Updates</span>
          </div>
        </div>

        <div className="dashboard-stat"
          onClick={() => {
            setShowSaved(true);
            setTimeout(() => {
              updatesRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}>
          <div className="stat-icon">★</div>
          <div>
            <strong>{saved.length}</strong>
            <span>Saved</span>
          </div>
        </div>

      </section>


      {/* AI DAILY BRIEF */}
      <section className="daily-brief">

        <div className="brief-top">
          <div className="brief-icon">✦</div>

          <div>
            <div className="brief-heading">
              <span>AI DAILY BRIEF</span>
              <small>Updated just now</small>
            </div>

            <h2>Here’s what matters to you today.</h2>
          </div>
        </div>

        <div className="brief-items">

          <div className="brief-item urgent">
            <div className="brief-item-icon">!</div>
            <div>
              <span>URGENT</span>
              <strong>Semester Examination Schedule Released</strong>
              <p>Check your examination schedule.</p>
            </div>
          </div>

          <div className="brief-item deadline">
            <div className="brief-item-icon">◷</div>
            <div>
              <span>DEADLINE</span>
              <strong>Assignment Submission</strong>
              <p>Due in 2 days • Submit your assignment.</p>
            </div>
          </div>

          <div className="brief-item general">
            <div className="brief-item-icon">✦</div>
            <div>
              <span>RECOMMENDED</span>
              <strong>Coding Club Meetup</strong>
              <p>19 September • View details.</p>
            </div>
          </div>

        </div>

        <div className="brief-footer">
          <span>✨ Personalized using your campus information</span>
          <button>View all updates →</button>
        </div>

      </section>
      {/* AI Q&A */}

      
      {/* MAIN CONTENT */}
      <div className="dashboard-content"
        ref={updatesRef}>
        <div className="dashboard-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search campus information..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="updates-header">
          <div>
            <span className="section-label">CAMPUS INFORMATION</span>
            <h2>{showSaved ? "Saved Notices" : "Important Updates"}</h2>
            {showSaved && (
              <button
                className="show-all-button"
                onClick={() => setShowSaved(false)}
              >
                ← Show All Notices
              </button>
            )}
          </div>

          <button
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter <span>⌄</span>
          </button>
          {showFilter && (
            <div className="filter-menu">
              <button
                onClick={() => {
                  setFilter("all");
                  setShowFilter(false);
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilter("urgent");
                  setShowFilter(false);
                }}
              >
                Urgent
              </button>

              <button
                onClick={() => {
                  setFilter("important");
                  setShowFilter(false);
                }}
              >
                Important
              </button>

              <button
                onClick={() => {
                  setFilter("general");
                  setShowFilter(false);
                }}
              >
                General
              </button>
            </div>
          )}
        </div>
        {selectedNotice && (
          <div
            className="reason-overlay"
            onClick={() => setSelectedNotice(null)}
          >
            <div
              className={`reason-card ${selectedNotice.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="reason-close"
                onClick={() => setSelectedNotice(null)}
              >
                ×
              </button>

              <div className="reason-sparkle">✦</div>

              <span className="reason-label">PERSONALIZED FOR YOU</span>

              <h2>Why am I seeing this?</h2>

              <p>{selectedNotice.reason}</p>

              <div className="reason-notice">
                <strong>{selectedNotice.title}</strong>
                <span>CampusAI personalization</span>
              </div>

              <button
                className="reason-done"
                onClick={() => setSelectedNotice(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
        {sourceNotice && (
          <div
            className="source-overlay"
            onClick={() => setSourceNotice(null)}
          >
            <div
              className="source-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="source-close"
                onClick={() => setSourceNotice(null)}
              >
                ×
              </button>

              <div className="source-icon">
                📄
              </div>

              <span className="source-label">
                ORIGINAL CAMPUS NOTICE
              </span>

              <h2>{sourceNotice.title}</h2>

              <div className="source-status">
                <span>✓</span>
                Authorized Campus Source
              </div>

              <div className="source-details">
                <div>
                  <span>SOURCE</span>
                  <strong>College Administration</strong>
                </div>

                <div>
                  <span>NOTICE TYPE</span>
                  <strong>{sourceNotice.priority}</strong>
                </div>

                <div>
                  <span>PUBLISHED</span>
                  <strong>13 September 2026</strong>
                </div>
              </div>

              <div className="source-original">
                <span>ORIGINAL NOTICE</span>
                <p>{sourceNotice.text}</p>
              </div>

              <button
                className="source-done"
                onClick={() => setSourceNotice(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* NOTICE CARDS */}
        <div className="notice-list">
          {showSaved && (
            <div className="saved-info">
              <h3>Saved Notices</h3>
              <p>
                {saved.length === 0
                  ? "You haven't saved any notices yet."
                  : `You have saved ${saved.length} notice${saved.length > 1 ? "s" : ""}.`}
              </p>
            </div>
          )}
          {filteredNotices.length === 0 && (
            <div className="no-results">
              <h3>No campus information found</h3>
              <p>Try searching with a different keyword.</p>
            </div>
          )}

          {filteredNotices.map((notice) => (
            <article
              className={`campus-notice ${notice.type}`}
              key={notice.id}
            >

              <div className="notice-header">

                <span className={`notice-priority ${notice.type}`}>
                  {notice.priority}
                </span>

                <button
                  className={`save-button ${saved.includes(notice.id) ? "saved" : ""
                    }`}
                  onClick={() => toggleSave(notice.id)}
                >
                  {saved.includes(notice.id) ? "★" : "☆"}
                </button>

              </div>

              <h3>{notice.title}</h3>

              <p>{notice.text}</p>

              <div className="notice-meta">

                <div>
                  <span>DEADLINE</span>
                  <strong>{notice.deadline}</strong>
                  {reminders.includes(notice.id) && (
                    <small className="reminder-active">
                      🔔 Reminder set for this deadline
                    </small>
                  )}
                </div>

                <div>
                  <span>ACTION</span>
                  <strong>{notice.action}</strong>
                </div>

              </div>

              <div className="notice-footer">
                <button onClick={() => setSelectedNotice(notice)}>
                  Why am I seeing this?
                </button>

                <button onClick={() => toggleReminder(notice.id)}>
                  {reminders.includes(notice.id)
                    ? "🔔 Reminder Set"
                    : "Set Reminder"}
                </button>
                <button onClick={() => setSourceNotice(notice)}>
                  View Source →
                </button>
              </div>

            </article>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;